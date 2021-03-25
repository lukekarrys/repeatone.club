/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
'use strict'

const request = require('request')
const qs = require('qs')
const _ = require('lodash')
const async = require('async')

// eslint-disable-next-line no-console
const log = console.log.bind(console)

const URI_BASE = 'http://ws.audioscrobbler.com/2.0/?'
const DEFAULT_PARAMS = {
  format: 'json',
  limit: 5,
  method: 'user.getrecenttracks'
}





const getTrackId = (track) =>
  track.mbid || track.url || `${track.name}-${track.artist['#text']}`

const getTrackDesc = (track) =>
  `${track.artist['#text']} ${track.name}`.replace(/\s+/g, ' ')

const mergeTracks = (tracks) => _.reduce(tracks, (res, track) => {
  if (res === null) {
    return track
  }
    if (_.filter(res.image, '#text').length === 0) {
      res.image = track.image
    }
    return res
  
}, null)

const getLargestImage = (track) => {
  const {image} = track
  return (_.find(image, {size: 'extralarge'}) ||
    _.find(image, {size: 'large'}) ||
    _.find(image, {size: 'medium'}) ||
    _.find(image, {size: 'small'}) || {})['#text']
}

const toBase64 = (h, b) => {
  // eslint-disable-next-line node/no-deprecated-api
  const img = Buffer.from(b).toString('base64')
  return `data:${h['content-type']};base64,${img}`
}

const fetchBase64Image = (uri, cb) => {
  request({uri, encoding: null}, (error, resp, body) => {
    if (error || resp.statusCode !== 200) {
      return cb(new Error('No image'))
    }
      return cb(null, toBase64(resp.headers, body))
    
  })
}

const fetchItunesImage = (track, cb) => {
  const trackDesc = getTrackDesc(track)
  const url = `https://itunes.apple.com/search?media=music&term=${trackDesc.replace(/ /g, '+')}`

  log(`Fetching iTunes image ${trackDesc} ${url}`)

  request(url, (err, resp, body) => {
    if (err || resp.statusCode !== 200) {
      cb(new Error('Error fetching from iTunes'))
      return 
    }

    const data = JSON.parse(body)

    if (!data || data.resultCount === 0 || !data.results) {
      cb(new Error('No results'))
      return 
    }

    const [resultTrack] = data.results || []
    const image = resultTrack && resultTrack.artworkUrl100

    if (!image) {
      cb(new Error('No image'))
      return 
    }

     fetchBase64Image(image.replace('.100x100-', '.300x300-'), cb)
  })
}

const {LASTFM_API_KEY} = process.env

const res = (body, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(body),
})

exports.handler = async (event) => {
  const { queryStringParameters, httpMethod = '' } = event

  if (httpMethod !== 'GET') {
    return res({ error: `${httpMethod} not supported` }, 405)
  }

  if (queryStringParameters == null) {
    return res({ error: 'Missing one or more query string parameters' }, 400)
  }

  const { user } = queryStringParameters

  if (!user) {
    return res({ error: 'You must specify a user' }, 400)
  }

  if (!LASTFM_API_KEY) {
    return res({
      error: 'LASTFM_API_KEY env variable is not set',
    })
  }

  log(`Requesting user ${user}`)

  const params = _.assign({user, api_key: LASTFM_API_KEY}, DEFAULT_PARAMS)
  const fetchUrl = `${URI_BASE}${qs.stringify(params)}`

  // We need these as part of our request iterator and our final callback
  let page = 0
  let count = 0
  let track = null
  const repeats = []
  let isRepeating = true

  const testRepeating = () => isRepeating
  const requestTracks = (requestCb) => {
    log(`Fetching page ${page + 1}`)

    request(`${fetchUrl  }&page=${++page}`, (__, ___, body) => {
      const data = JSON.parse(body)

      if (data.error) {
         requestCb(new Error(`${data.error}: ${data.message}`))
         return
      }

      const tracks = data.recenttracks.track
      track = track || _.first(tracks)

      if (!track) {
        log(`No track`)

        // If for some reason there are no tracks then we are already done
        isRepeating = false
      } else {
        log(`Fetched ${tracks.length} tracks`)

        for (let i = 0, m = tracks.length; i < m; i++) {
          if (getTrackId(tracks[i]) === getTrackId(track)) {
            log(`Tracks match at ${i} index`)

            // Increment count and collect track if the tracks are the same
            repeats.push(tracks[i])
            count++
          } else {
            log(`Tracks dont match at ${i} index`)

            // The next track is not the same id as the first track so
            // we are done with out whilst loop
            isRepeating = false
            break
          }
        }
      }

      requestCb()
    })
  }

  // This is done in an async while loop because the alternative is fetching
  // the max limit from lastfm (200) but that takes quite a bit of time to return.
  // So to optimize for the case of <200 repeat listens (which is probably every case)
  // we fetch 5 at a time and analyze in chunks.
  try {
  const response = await new Promise((resolve,reject)=>async.whilst(
    testRepeating,
    requestTracks,
    (err) => {
      if (err) {
        log(err)
        reject(err)
        return
      }
      
      if (!count) {
        log('No count')
        resolve({user: _.escape(user), count: null, track: null})
        return 
      }
        const mergedTrack = mergeTracks(repeats)
        const values = {count, user: _.escape(user), track: mergedTrack}
        const uri = getLargestImage(values.track)
        const returnWithImage = (imageErr, base64, imageSource) => {
          log(`Fetched ${imageSource} image: ${base64 ? 'success' : imageErr.message}`)
          resolve(_.assign({base64, imageSource}, values))
        }

        if (uri) {
          log(`Fetching lastfm image ${uri}`)
          fetchBase64Image(uri, (imageErr, base64) => returnWithImage(imageErr, base64, 'lastfm'))
        } else {
          fetchItunesImage(mergedTrack, (imageErr, base64) => returnWithImage(imageErr, base64, 'itunes'))
        }
      
    }
  ))

  return res(response)
  } catch (err) {
    return res({error: err.message}, 500)
  }
}
