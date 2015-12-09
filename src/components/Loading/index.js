'use strict';

import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(require('./style.less'))
export default class Loading extends Component {
  render() {
    return (
      <div>
        <div styleName='root' />
      </div>
    );
  }
}
