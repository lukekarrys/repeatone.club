'use strict';

import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        {this.props.children}
        <footer>
          <ul>
            <li><a href='https://github.com/lukekarrys/repeatone'>GitHub</a></li>
            <li>by <a href='https://twitter.com/lukekarrys'>@lukekarrys</a></li>
          </ul>
        </footer>
      </div>
    );
  }
}
