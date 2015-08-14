'use strict';

import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

import Color from '../../helpers/base64ToColor';
import colors from 'colors.css';

require('../../../node_modules/animate.css/source/_base.css');
require('../../../node_modules/animate.css/source/sliding_entrances/slideInLeft.css');
require('../../styles/track-description.less');

const getColors = (img) => {
  const color = Color(img);
  const styles = {
    background: {
      'backgroundColor': colors.gray
    },
    link: {
      color: colors.black,
      ':hover': {
        color: colors.black
      }
    }
  };

  if (color) {
    styles.background.backgroundColor = color().lighten(0.4).rgbString();
    styles.link.color = color().darken(0.4).rgbString();
    styles.link[':hover'].color = color().darken(0.8).rgbString();
  }

  return styles;
};

@Radium
export default class Description extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    base64: PropTypes.string
  }

  render () {
    const {count, track, user, base64} = this.props;
    const {name, url, artist} = track;
    const artistName = artist['#text'];
    const style = getColors(base64);

    return (
      <div style={style.background} className='description'>
        <div className='description-text animated slideInLeft'>
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
