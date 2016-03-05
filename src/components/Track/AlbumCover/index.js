'use strict';

import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(require('./style.less'))
export default class AlbumCover extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image),
    track: PropTypes.object.isRequired
  }

  render() {
    const {image, track} = this.props;
    return (
      <div styleName='root'>
        <div styleName='shadow' />
        {image && <img styleName='image' src={image.src} />}
        {!image &&
          <div styleName='text'>
            <p>{track.artist['#text']}</p>
            <p>{track.album['#text']}</p>
          </div>
        }
      </div>
    );
  }
}
