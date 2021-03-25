'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import browserHistory from './helpers/history';
import App from './components/App';
import Landing from './pages/Landing';
import User from './pages/User';
import NotFound from './pages/NotFound';

import './styles.less';

render(
  <Router history={browserHistory}>
    <App>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:user" component={User} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
