'use strict';

import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import random from 'lodash/number/random';

import {sync as imageToStyles} from '../../helpers/imageToStyles';

require('animate.css/source/sliding_entrances/slideInLeft.css');
require('../../styles/track-description.less');

@Radium
export default class Description extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    image: PropTypes.instanceOf(window.Image)
  }

  state = {
    darkBg: random()
  }

  render () {
    const {count, track, user, image} = this.props;
    const {name, url, artist} = track;
    const artistName = artist['#text'];
    const style = imageToStyles({image, darkBg: this.state.darkBg});

    return (
      <div style={style.background} className='description'>
        <div style={style.text} className='description-text animated slideInLeft'>
          <a style={style.link} key='userLink' href={`http://www.last.fm/user/${user}`}>{user}</a>
          {' '}
          {count > 1 ? 'has listened to' : 'isn\'t listening to anything on repeat but is currently listening to'}
          {' '}
          <a style={style.link} key='trackLink' href={url}>{name} by {artistName}</a>
          {count > 1 ? ' on repeat ' : null}
          {count > 1 ? <span className='count'>{count}</span> : null}
          {count > 1 ? ' times' : null}
        </div>
      </div>
    );
  }
}
