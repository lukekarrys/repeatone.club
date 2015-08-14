/* global Image */

'use strict';

import Color from 'color';
import ColorThief from 'exports?ColorThief!color-thief';

const loadBase64 = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};

const base64ToColor = (base64) => {
  const color = base64 ? Color().rgb(new ColorThief().getColor(loadBase64(base64))) : null;
  return color ? () => color.clone() : null;
};

export default base64ToColor;
