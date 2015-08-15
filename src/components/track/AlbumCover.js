'use strict';

import React, {Component, PropTypes} from 'react';

require('animate.css/source/sliding_entrances/slideInDown.css');
require('../../styles/album-cover.less');

export default class AlbumCover extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image),
    track: PropTypes.object.isRequired
  }

  render () {
    const {image, track} = this.props;
    return (
      <div className='album-cover animated slideInDown'>
        <div className='shadow' />
        {image ?
          <img src={image.src} /> :
          <div className='text-cover'>
            <p className='artist'>{track.artist['#text']}</p>
            <p className='album'>{track.album['#text']}</p>
          </div>
        }
      </div>
    );
  }
}
