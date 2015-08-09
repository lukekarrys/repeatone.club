'use strict';

import React, {Component} from 'react';

require('../styles/footer.less');

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <a className='btn btn--s btn--black' href='https://github.com/lukekarrys/repeatone'>GitHub</a>
        <a className='btn btn--s btn--black' href='https://twitter.com/lukekarrys'>@lukekarrys</a>
      </footer>
    );
  }
}
