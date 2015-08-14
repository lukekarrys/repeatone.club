'use strict';

import React, {Component, PropTypes} from 'react';

require('../../../node_modules/animate.css/source/fading_entrances/fadeIn.css');
require('../../styles/background.less');

export default class Background extends Component {
  static propTypes = {
    base64: PropTypes.string
  }

  render () {
    const {base64} = this.props;

    if (!base64) return null;

    return (
      <div className='background animated fadeIn'>
        <div style={{backgroundImage: `url(${base64})`}} />
      </div>
    );
  }
}
