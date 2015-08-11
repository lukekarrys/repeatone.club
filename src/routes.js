'use strict';

import React from 'react';
import {Route} from 'react-router';

import App from './App';
import Landing from './pages/Landing';
import User from './pages/User';
import NotFound from './pages/NotFound';

const routes = (
  <Route component={App}>
    <Route path='/' component={Landing} />
    <Route path='user/:user' component={User} />
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
