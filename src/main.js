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

const pageview = ({search, pathname}) => ga('send', 'pageview', pathname + search);
browserHistory.listen(pageview);
pageview(browserHistory.getCurrentLocation());

render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Landing} />
      <Route path=':user' component={User} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));
