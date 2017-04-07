'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import UserInput from '../UserInput';

@CSSModules(require('./style.less'))
export default class Error extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    const {message} = this.props;

    return (
      <div>
        <p styleName='root'>
          {message + (message.slice(-1) !== '.' ? '.' : '')}
        </p>
        <UserInput />
      </div>
    );
  }
}
