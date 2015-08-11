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
    this.transitionTo(`/user/${username}`);
  }

  handleUsername = (e) => {
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <div>
        <form className='user-input' onSubmit={this.handleSubmit}>
          <input
            className='inpt inpt--full'
            type='text'
            placeholder='Find user'
            value={this.state.username}
            onChange={this.handleUsername}
          />
        </form>
      </div>
    );
  }
}

reactMixin.onClass(UserInput, Navigation);

export default UserInput;

