'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Radium from 'radium';
import {random} from 'lodash';
import {sync as imageToStyles} from '../../../helpers/imageToStyles';

@Radium
@CSSModules(require('./style.less'))
export default class Description extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    track: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    image: PropTypes.instanceOf(window.Image)
  };

  state = {
    darkBg: random()
  };

  render() {
    const {count, track, user, image} = this.props;
    const {name, url, artist} = track;
    const artistName = artist['#text'];
    const colors = imageToStyles({image, darkBg: this.state.darkBg});

    return (
      <div style={colors.background} styleName='root'>
        <div style={colors.text} styleName='text'>
          <a style={colors.link} key='userLink' href={`http://www.last.fm/user/${user}`}>{user}</a>
          {' '}
          {count > 1 ? 'has listened to' : 'isn\'t listening to anything on repeat but is currently listening to'}
          {' '}
          <a style={colors.link} key='trackLink' href={url}>{name} by {artistName}</a>
          {count > 1 ? ' on repeat ' : null}
          {count > 1 ? count : null}
          {count > 1 ? ' times' : null}
        </div>
      </div>
    );
  }
}
