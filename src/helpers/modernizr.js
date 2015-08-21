'use strict';

import classnames from 'classnames';

const {cssfilters, fontface} = window.Modernizr;
delete window.Modernizr;

export default {
  cssfilters,
  fontface,
  classnames: classnames({cssfilters, fontface})
};
