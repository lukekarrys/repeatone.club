'use strict';

import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

import Background from './Background';
import AlbumCover from './AlbumCover';
import Description from './Description';

@Radium
export default class Track extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    base64: PropTypes.string
  }

  render () {
    const {count, track, user, base64} = this.props;

    return (
      <div>
        <Background {...{base64}} />
        <AlbumCover {...{base64, track}} />
        <Description {...{count, track, user, base64}} />
      </div>
    );
  }
}
