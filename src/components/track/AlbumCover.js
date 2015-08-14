'use strict';

import React, {Component, PropTypes} from 'react';

require('../../../node_modules/animate.css/source/_base.css');
require('../../../node_modules/animate.css/source/sliding_entrances/slideInDown.css');
require('../../styles/album-cover.less');

export default class AlbumCover extends Component {
  static propTypes = {
    base64: PropTypes.string,
    track: PropTypes.object.isRequired
  }

  render () {
    const {base64, track} = this.props;
    return (
      <div className='album-cover animated slideInDown'>
        <div className='shadow' />
        {base64 ?
          <img src={base64} /> :
          <div className='text-cover'>
            <p className='artist'>{track.artist['#text']}</p>
            <p className='album'>{track.album['#text']}</p>
          </div>
        }
      </div>
    );
  }
}
