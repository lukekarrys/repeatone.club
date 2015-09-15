'use strict';

import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import CSSModules from 'react-css-modules';

@CSSModules(require('./style.less'))
class UserInput extends Component {
  state = {
    username: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username} = this.state;
    if (!username) return;
    this.history.pushState(null, `/${username}`);
  }

  handleUsername = (e) => {
    this.setState({username: e.target.value});
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          styleName='root'
          type='text'
          placeholder='Find last.fm user'
          value={this.state.username}
          onChange={this.handleUsername}
        />
      </form>
    );
  }
}

reactMixin.onClass(UserInput, History);

export default UserInput;

