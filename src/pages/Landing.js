'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

import UserInput from '../components/UserInput';

export default class Landing extends Component {
  render () {
    return (
      <div>
        <UserInput />
        <p>Or <Link to='/user/formatfanatic'>check me out</Link>.</p>
      </div>
    );
  }
}
