'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {fontface} from '../../helpers/modernizr';

@CSSModules(require('./style.less'))
export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string
  }

  render() {
    if (fontface) {
      return (
        <span>
          <span styleName={this.props.name} aria-hidden='true' />
          <span style={{display: 'none'}} aria-hidden='false'>{` ${this.props.children}`}</span>
        </span>
      );
    }

    return (
      <span>{this.props.children}</span>
    );
  }
}
