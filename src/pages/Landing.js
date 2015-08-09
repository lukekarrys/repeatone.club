'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Landing extends Component {
  render () {
    return (
      <div>
        Go to <Link to='/user/formatfanatic'>user/formatfanatic</Link>
      </div>
    );
  }
}
