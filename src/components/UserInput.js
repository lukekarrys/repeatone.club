'use strict';

import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {Navigation} from 'react-router';

require('../styles/user-input.less');

class UserInput extends Component {
  state = {
    username: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username} = this.state;
    if (!username) return;
    this.transitionTo(`/${username}`);
  }

  handleUsername = (e) => {
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <form className='user-input' onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Find user'
          value={this.state.username}
          onChange={this.handleUsername}
        />
      </form>
    );
  }
}

reactMixin.onClass(UserInput, Navigation);

export default UserInput;

