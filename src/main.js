'use strict';

import React from 'react';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';

const history = new BrowserHistory();
React.render(<Router history={history} children={routes} />, document.body);
