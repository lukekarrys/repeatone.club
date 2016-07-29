'use strict';

import makeClassnames from 'classnames';

const {cssfilters, fontface} = window.Modernizr;
delete window.Modernizr;

export {cssfilters};
export {fontface};
export const classnames = makeClassnames({cssfilters, fontface});
