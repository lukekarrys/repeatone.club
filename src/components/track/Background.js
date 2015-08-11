'use strict';

import React, {Component, PropTypes} from 'react';

require('../../styles/background.less');

export default class Background extends Component {
  static propTypes = {
    base64: PropTypes.string
  }

  render () {
    const {base64} = this.props;

    if (!base64) return null;

    return (
      <div className='background'>
        <div style={{backgroundImage: `url(${base64})`}} />
      </div>
    );
  }
}
