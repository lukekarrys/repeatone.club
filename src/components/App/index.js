'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Footer from '../Footer';
import {classnames as modernizrClasses} from '../../helpers/modernizr';

@CSSModules(require('./style.less'))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div styleName='main' className={modernizrClasses}>
        <div styleName='center'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
