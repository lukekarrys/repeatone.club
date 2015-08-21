'use strict';

import React, {Component} from 'react';
import gauge from '../styles/gauge.css';
import loading from '../styles/loading.less';

export default class Loading extends Component {
  render () {
    return (
      <div>
        <div className={`${loading.root} ${gauge['gauge-loader']}`} />
      </div>
    );
  }
}
