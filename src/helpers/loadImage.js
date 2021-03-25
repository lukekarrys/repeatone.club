'use strict';

const { Image } = window;

const loadImage = (src, cb) => {
  const image = new Image();
  image.onerror = () => cb(new Error('Error loading image'));
  image.onload = () => cb(null, image);
  image.src = src;
};

export default loadImage;
