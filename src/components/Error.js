'use strict';

import React, {Component, PropTypes} from 'react';
import UserInput from './UserInput';
import style from '../styles/error.less';

export default class Error extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render () {
    const {message} = this.props;

    return (
      <div>
        <p className={style.root}>
          {message + (message.slice(-1) !== '.' ? '.' : '')}
        </p>
        <UserInput />
      </div>
    );
  }
}
