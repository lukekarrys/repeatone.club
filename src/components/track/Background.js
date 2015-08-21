'use strict';

import React, {Component, PropTypes} from 'react';
import {animated} from 'animate.css/source/_base.css';
import {fadeIn} from 'animate.css/source/fading_entrances/fadeIn.css';
import style from '../../styles/background.less';
import {cssfilters} from '../../helpers/modernizr';

export default class Background extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image)
  }

  render () {
    const {image} = this.props;

    if (!image || !cssfilters) return null;

    return (
      <div className={`${style.root} ${animated} ${fadeIn}`}>
        <div
          className={style.image}
          style={{backgroundImage: `url(${image.src})`}}
        />
      </div>
    );
  }
}
