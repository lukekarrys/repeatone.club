/* global Image */

'use strict';

import Color from 'color';
import cssColors from 'colors.css';
import sortBy from 'lodash/collection/sortBy';
import bows from 'bows';
import ColorThief from 'exports?ColorThief!color-thief';

const log = bows('base64ToColors');

const first = (arr, n = 0) => arr[n];
const last = (arr, n = 0) => arr[arr.length - (n + 1)];

const luminosity = (rgb) => Color().rgb(rgb).luminosity();
const contrast = (rgb1, rgb2) => Color().rgb(rgb1).contrast(Color().rgb(rgb2));
const rgbString = (rgb) => Color().rgb(rgb).rgbString();

const DEFAULT_COLORS = {
  background: cssColors.gray,
  link: cssColors.black,
  linkHover: cssColors.black
};

const loadBase64 = (src) => {
  const image = new Image();
  image.src = src;
  return image;
};

const base64ToColors = (base64, darkBg) => {
  if (!base64) return DEFAULT_COLORS;

  const img = loadBase64(base64);
  const palette = new ColorThief().getPalette(img, 8);
  const colors = sortBy(palette, luminosity);

  const background = darkBg ? first(colors, 0) : last(colors, 0);
  const link = darkBg ? last(colors, 1) : first(colors, 1);
  const text = darkBg ? last(colors, 0) : first(colors, 0);
  const hover = text;

  log(`Contrast: bg -> link ${contrast(background, link)}`);
  log(`Contrast: bg -> text ${contrast(background, text)}`);

  return {
    background: rgbString(background),
    link: rgbString(link),
    linkHover: rgbString(hover),
    text: rgbString(text)
  };
};

export default base64ToColors;
