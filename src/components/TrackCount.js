'use strict';

import React, {Component, PropTypes} from 'react';
import {last} from 'lodash';

export default class TrackCount extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired
  }

  render () {
    const {count, track, user} = this.props;
    const {name, url, image, artist} = track;
    const artistName = artist['#text'];
    const albumCover = last(image)['#text'];

    return (
      <div>
        <div className='background' style={{backgroundImage: `url(${albumCover})`}} />
        <div className='track-count'>
          <div className='album-cover'>
            <div className='shadow' />
            <img src={albumCover} />
          </div>
          <span className='description'>
            <a href={`http://www.last.fm/user/${user}`}>{user}</a> has listened to
            {' '}
            <a href={url}>{name} by {artistName}</a>
            {' '}
            <span className='count'>{count}</span> times in a row
          </span>
        </div>
      </div>
    );
  }
}
