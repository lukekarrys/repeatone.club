'use strict';

module.exports = require('hjs-webpack')({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: function html (context) {
    return {
      'index.html': context.defaultTemplate(),
      '200.html': context.defaultTemplate(),
      'CNAME': 'repeatone.lukekarrys.com'
    };
  }
});
