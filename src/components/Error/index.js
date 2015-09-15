'use strict';

import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import UserInput from '../UserInput';

@CSSModules(require('./style.less'))
export default class Error extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render () {
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
