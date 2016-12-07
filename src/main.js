/* globals ga */

'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import Landing from './pages/Landing';
import User from './pages/User';
import NotFound from './pages/NotFound';

import './styles.less';

const onEnter = () => ga('send', 'pageview');

render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Landing} onEnter={onEnter} />
      <Route path=':user' component={User} onEnter={onEnter} />
      <Route path='*' component={NotFound} onEnter={onEnter} />
    </Route>
  </Router>
), document.getElementById('root'));
