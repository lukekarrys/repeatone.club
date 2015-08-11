'use strict';

import React, {Component, PropTypes} from 'react';

import Footer from './Footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        <div className='main'>
          <div className='center-content'>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
