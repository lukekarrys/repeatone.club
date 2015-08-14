'use strict';

import xhr from 'xhr';

const URI_BASE = 'https://webtask.it.auth0.com/api/run/wt-lukekarrys-gmail_com-0/repeatone';
const uri = user => `${URI_BASE}?user=${user}`;

const api = (user, cb) =>
  xhr({
    uri: uri(user),
    json: true,
    useXDR: true
  }, (__, resp, body) => {
    if (resp.statusCode !== 200) {
      cb(new Error(body.message));
    }
    else {
      cb(null, body);
    }
  });

export default api;
