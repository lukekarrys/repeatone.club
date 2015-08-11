'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

require('../styles/footer.less');
require('../styles/icons.css');

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <Link to='/'>
          <span className='icon icon-home' />
        </Link>
        <a href='https://github.com/lukekarrys/repeatone'>
          <span className='icon icon-github' />
        </a>
        <a href='https://twitter.com/lukekarrys'>
          <span className='icon icon-twitter' />
        </a>
      </footer>
    );
  }
}
