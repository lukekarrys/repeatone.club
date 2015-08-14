'use strict';

import webpackConfig from 'hjs-webpack';
import assign from 'lodash/object/assign';
import pack from './package.json';
import cssnano from 'cssnano';

const {homepage, name} = pack;
const manifestName = name + '.appcache';

const template = (ctx) => {
  return `
    <!doctype html>
    <html lang="en"${ctx.isDev ? '' : ` manifest="${manifestName}"`}>
    <head>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-title" content="${name}">
      <title>${name}</title>
      <link rel="stylesheet" href="/${ctx.css}"/>
    </head>
    <body></body>
    <script src="/${ctx.main}"></script>
  `.replace(/\n\s*/gm, '');
};

const manifest = (ctx) => {
  return `
    CACHE MANIFEST
    # ${ctx.id}
    ${ctx.indexName}
    ${ctx.main}
    ${ctx.css}
    NETWORK:
    *
    http://*
    https://*
  `.replace(/^\s*/gm, '');
};

const config = webpackConfig({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  hostname: 'lukekarrys.local',
  html: function html (ctx) {
    const {isDev} = ctx;
    const indexName = isDev ? 'index.html' : '200.html';
    const id = new Date().valueOf();
    return {
      CNAME: homepage.replace(/^https?:\/\//, ''),
      [indexName]: template(ctx),
      [manifestName]: manifest(assign({id, indexName}, ctx))
    };
  }
});

config.postcss.push(cssnano({
  comments: {removeAll: true},
  idents: false
}));

export default config;
