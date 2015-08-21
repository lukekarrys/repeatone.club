'use strict';

import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {fontface} from '../helpers/modernizr';
import style from '../styles/footer.less';
import icons from '../styles/icons.css';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string
  }

  render () {
    if (fontface) {
      return (
        <span>
          <span className={`${icons.icon} ${icons[this.props.name]}`} aria-hidden='true' />
          <span style={{display: 'none'}} aria-hidden='false'>{` ${this.props.children}`}</span>
        </span>
      );
    }

    return (
      <span>{this.props.children}</span>
    );
  }
}

export default class Footer extends Component {
  render () {
    return (
      <footer className={style.root}>
        <Link to='/'>
          <Icon name='home'>Home</Icon>
        </Link>
        <a href='https://github.com/lukekarrys/repeatone'>
          <Icon name='github'>GitHub</Icon>
        </a>
        <a href='https://twitter.com/lukekarrys'>
          <Icon name='twitter'>Twitter</Icon>
        </a>
      </footer>
    );
  }
}
