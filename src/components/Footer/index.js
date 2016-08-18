'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import CSSModules from 'react-css-modules';
import Icon from '../Icon';

@CSSModules(require('./style.less'))
export default class Footer extends Component {
  render() {
    return (
      <footer styleName='root'>
        <Link to='/'>
          <Icon name='home'>Home</Icon>
        </Link>
        <a href='https://github.com/lukekarrys/repeatone'>
          <Icon name='github'>GitHub</Icon>
        </a>
        <a href='#'>Test</a>
      </footer>
    );
  }
}
