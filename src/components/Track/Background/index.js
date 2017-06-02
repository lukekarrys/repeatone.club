'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {cssfilters} from '../../../helpers/modernizr';

@CSSModules(require('./style.less'))
export default class Background extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(window.Image)
  };

  render() {
    const {image} = this.props;

    if (!image || !cssfilters) return null;

    return (
      <div styleName='root'>
        <div
          styleName='image'
          style={{backgroundImage: `url(${image.src})`}}
        />
      </div>
    );
  }
}
