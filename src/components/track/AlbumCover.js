'use strict';

import React, {Component, PropTypes} from 'react';
import {animated} from 'animate.css/source/_base.css';
import {slideInDown} from 'animate.css/source/sliding_entrances/slideInDown.css';
import style from '../../styles/album-cover.less';

export default class AlbumCover extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image),
    track: PropTypes.object.isRequired
  }

  render () {
    const {image, track} = this.props;
    return (
      <div className={`${style.root} ${animated} ${slideInDown}`}>
        <div className={style.shadow} />
        {image ?
          <img className={style.image} src={image.src} /> :
          <div className={style.text}>
            <p className='artist'>{track.artist['#text']}</p>
            <p className='album'>{track.album['#text']}</p>
          </div>
        }
      </div>
    );
  }
}
