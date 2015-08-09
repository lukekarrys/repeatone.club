'use strict';

import React from 'react';
import {Route} from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import User from './components/User';
import NotFound from './components/NotFound';

const routes = (
  <Route component={App}>
    <Route path='/' component={Landing} />
    <Route path='user/:user' component={User} />
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
