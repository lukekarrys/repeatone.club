'use strict';

import React, {Component} from 'react';

import UserInput from '../components/UserInput';

export default class NotFound extends Component {
  render () {
    return (
      <div>
        <p>That page does not exist.</p>
        <UserInput />
      </div>
    );
  }
}
