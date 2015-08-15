'use strict';

import React, {Component} from 'react';

require('css-spinners/css/spinner/gauge.css');
require('../styles/loading.less');

export default class Loading extends Component {
  render () {
    return (
      <div className='loading-container'>
        <div className='gauge-loader' />
      </div>
    );
  }
}
