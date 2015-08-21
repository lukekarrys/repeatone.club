'use strict';

import Color from 'color';
import cssColors from 'colors.css';
import sortBy from 'lodash/collection/sortBy';
import bows from 'bows';
import ColorThief from 'exports?ColorThief!color-thief';
import loadImage from './loadImage';

const {Image} = window;
const log = bows('base64ToColors');

const first = (arr, n = 0) => arr[n];
const last = (arr, n = 0) => arr[arr.length - (n + 1)];

const luminosity = (rgb) => Color().rgb(rgb).luminosity();
const contrast = (rgb1, rgb2) => Color().rgb(rgb1).contrast(Color().rgb(rgb2));
const rgbString = (rgb) => Color().rgb(rgb).rgbString();

const colorsToStyles = (c) => {
  const {background, text, link, linkHover} = c;
  return {
    background: {backgroundColor: background},
    text: {color: text},
    link: {
      color: link,
      ':hover': {color: linkHover}
    }
  };
};

const DEFAULT_STYLES = colorsToStyles({
  background: cssColors.gray,
  link: cssColors.black,
  text: cssColors.black,
  linkHover: cssColors.black
});

const imageToStyles = ({image, darkBg}) => {
  const palette = new ColorThief().getPalette(image, 8);
  const colors = sortBy(palette, luminosity);

  const background = darkBg ? first(colors, 0) : last(colors, 0);
  const link = darkBg ? last(colors, 1) : first(colors, 1);
  const text = darkBg ? last(colors, 0) : first(colors, 0);
  const linkHover = text;

  log(`Contrast: bg -> link ${contrast(background, link)}`);
  log(`Contrast: bg -> text ${contrast(background, text)}`);

  return colorsToStyles({
    background: rgbString(background),
    link: rgbString(link),
    linkHover: rgbString(linkHover),
    text: rgbString(text)
  });
};

// Only for use with an already loaded image. Otherwise
// ColorThief will throw errors.
const imageToStylesSync = ({err, image, darkBg}) => {
  let errMessage;

  if (err) {
    errMessage = err.message ? err.message : err;
  }
  else if (!image) {
    errMessage = 'No image';
  }
  else if (!(image instanceof Image)) {
    errMessage = 'image is not an Image';
  }

  if (errMessage) {
    log(`${errMessage}, returning default colors`);
    return DEFAULT_STYLES;
  }

  return imageToStyles({image, darkBg});
};

// Takes an image or a string and makes sure its loaded
// and then returns the styles. Any error results in the return
// of the default styles
const loadImageToStyles = ({image, darkBg}, cb) => {
  if (!image) {
    return cb(null, imageToStylesSync(new Error('No image')));
  }

  const imageSrc = image instanceof Image ? image.src : image;

  loadImage(imageSrc, (err, loadedImage) => {
    cb(null, imageToStylesSync({darkBg, err, image: loadedImage}));
  });
};

export {loadImageToStyles as async};
export {imageToStylesSync as sync};
