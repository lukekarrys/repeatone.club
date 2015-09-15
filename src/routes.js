/* globals ga */

'use strict';

import React from 'react';
import {Route} from 'react-router';

import App from './components/App';
import Landing from './pages/Landing';
import User from './pages/User';
import NotFound from './pages/NotFound';

const pageview = () => ga('send', 'pageview');

const routes = (
  <Route component={App}>
    <Route path='/' component={Landing} onEnter={pageview} />
    <Route path=':user' component={User} onEnter={pageview} />
    <Route path='*' component={NotFound} onEnter={pageview} />
  </Route>
);

export default routes;
