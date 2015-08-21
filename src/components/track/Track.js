'use strict';

import React, {Component, PropTypes} from 'react';
import loadImage from '../../helpers/loadImage';
import Background from './Background';
import AlbumCover from './AlbumCover';
import Description from './Description';

export default class Track extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    base64: PropTypes.string
  }

  state = {
    hasImage: false,
    image: null
  }

  componentDidMount () {
    this.loadImage(this.props.base64);
  }

  componentWillReceiveProps (props) {
    this.loadImage(props.base64);
  }

  loadImage (base64) {
    if (base64) {
      loadImage(this.props.base64, (err, image) => {
        if (err) {
          this.setState({hasImage: true, image: null});
        }
        else {
          this.setState({hasImage: true, image});
        }
      });
    }
    else {
      this.setState({hasImage: false, image: null});
    }
  }

  render () {
    const {image, hasImage} = this.state;
    const {count, track, user} = this.props;

    if (hasImage === false) return null;

    return (
      <div>
        <Background {...{image}} />
        <AlbumCover {...{image, track}} />
        <Description {...{count, track, user, image}} />
      </div>
    );
  }
}
