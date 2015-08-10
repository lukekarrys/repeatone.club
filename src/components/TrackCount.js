'use strict';

import React, {Component, PropTypes} from 'react';
import {last} from 'lodash';

require('../styles/background.less');
require('../styles/track-count.less');

export default class TrackCount extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    base64: PropTypes.string
  }

  render () {
    const {count, track, user, base64} = this.props;
    const {name, url, image, artist} = track;
    const artistName = artist['#text'];
    const albumCover = base64 || last(image)['#text'];

    return (
      <div>
        <div className='background' style={{backgroundImage: `url(${albumCover})`}} />
        <div className='track-count'>
          <div className='album-cover'>
            <div className='shadow' />
            <img src={albumCover} />
          </div>
          <div className='description'>
            <a href={`http://www.last.fm/user/${user}`}>{user}</a> has listened to
            {' '}
            <a href={url}>{name} by {artistName}</a>
            {' '}
            <span className='count'>{count}</span> times in a row
          </div>
        </div>
      </div>
    );
  }
}
