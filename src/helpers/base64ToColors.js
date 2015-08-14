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
  text: cssColors.black,
  linkHover: cssColors.black
};

const colorsToStyles = (c) => {
  const {background, text, link, linkHover} = c;
  return {
    background: {
      'backgroundColor': background
    },
    text: {
      color: text
    },
    link: {
      color: link,
      ':hover': {
        color: linkHover
      }
    }
  };
};

const loadBase64 = (src, cb) => {
  const image = new Image();
  image.onerror = () => cb(new Error('Error loading image'));
  image.onload = () => cb(null, image);
  image.src = src;
};

const base64ToColors = (base64, darkBg, cb) => {
  if (!base64) {
    log('No base64, returning default colors');
    return cb(colorsToStyles(DEFAULT_COLORS));
  }

  loadBase64(base64, (err, img) => {
    if (err) {
      log(`${err.message}, returning default colors`);
      return cb(colorsToStyles(DEFAULT_COLORS));
    }

    const palette = new ColorThief().getPalette(img, 8);
    const colors = sortBy(palette, luminosity);

    const background = darkBg ? first(colors, 0) : last(colors, 0);
    const link = darkBg ? last(colors, 1) : first(colors, 1);
    const text = darkBg ? last(colors, 0) : first(colors, 0);
    const linkHover = text;

    log(`Contrast: bg -> link ${contrast(background, link)}`);
    log(`Contrast: bg -> text ${contrast(background, text)}`);

    cb(colorsToStyles({
      background: rgbString(background),
      link: rgbString(link),
      linkHover: rgbString(linkHover),
      text: rgbString(text)
    }));
  });
};

export default base64ToColors;
