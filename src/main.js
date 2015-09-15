/* globals ga */

'use strict';

import React from 'react';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './components/App';
import Landing from './pages/Landing';
import User from './pages/User';
import NotFound from './pages/NotFound';
import './styles.less';

const onEnter = () => ga('send', 'pageview');

React.render((
  <Router history={createBrowserHistory()}>
    <Route component={App}>
      <Route path='/' component={Landing} {...onEnter} />
      <Route path=':user' component={User} {...onEnter} />
      <Route path='*' component={NotFound} {...onEnter} />
    </Route>
  </Router>
), document.body);
