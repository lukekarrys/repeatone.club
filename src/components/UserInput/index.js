'use strict';

import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import CSSModules from 'react-css-modules';

@CSSModules(require('./style.less'))
export default class UserInput extends Component {
  state = {
    username: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {username} = this.state;
    if (!username) return;
    browserHistory.push({pathname: `/${username}`});
  }

  handleUsername = (e) => {
    this.setState({username: e.target.value});
  }

  render() {
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
