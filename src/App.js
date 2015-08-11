'use strict';

import React, {Component, PropTypes} from 'react';

import Footer from './components/Footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div className='main'>
        <div className='center-content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
