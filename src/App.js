'use strict';

import React, {Component, PropTypes} from 'react';
import Footer from './components/Footer';
import style from './styles/app.less';
import {classnames as modernizrClasses} from './helpers/modernizr';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div className={`${style.main} ${modernizrClasses}`}>
        <div className={style.center}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
