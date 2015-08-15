'use strict';

import React, {Component, PropTypes} from 'react';

require('animate.css/source/fading_entrances/fadeIn.css');
require('../../styles/background.less');

export default class Background extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image)
  }

  render () {
    const {image} = this.props;

    if (!image) return null;

    return (
      <div className='background animated fadeIn'>
        <div style={{backgroundImage: `url(${image.src})`}} />
      </div>
    );
  }
}
