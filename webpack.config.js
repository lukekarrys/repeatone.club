'use strict';

const crypto = require('crypto');
const webpackConfig = require('hjs-webpack');
const assign = require('lodash/assign');
const mergeWith = require('lodash/mergeWith');
const buildModernizr = require('modernizr').build;
const modernizrVersion = require('modernizr/package').version;
const {homepage} = require('./package.json');

const isDev = process.env.NODE_ENV !== 'production';

const DEFAULT_HASH_LENGTH = 8;
const hashId = (data, hashLength) => crypto
  .createHash('sha1')
  .update(data)
  .digest('hex')
  .slice(0, hashLength || DEFAULT_HASH_LENGTH);

const template = (ctx) => `
  <!doctype html>
  <html lang="en"${!ctx.isDev ? ` manifest="${ctx.manifestName}"` : ''}>
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Repeat One Club">
    <title>Welcome to the Repeat One Club</title>
    <script src="/${ctx.modernizrName}"></script>
    ${ctx.css ? `<link rel="stylesheet" href="/${ctx.css}"/>` : ''}
  </head>
  <body><div id="root"></div></body>
  <script src="/${ctx.main}"></script>
`.replace(/\n\s*/gm, '');

const manifest = (ctx) => `
  CACHE MANIFEST
  # ${ctx.id}
  ${ctx.indexName || ''}
  ${ctx.main || ''}
  ${ctx.css || ''}
  ${ctx.modernizrName || ''}
  NETWORK:
  *
  http://*
  https://*
`.replace(/^\s*/gm, '');

const modernizr = (ctx, cb) => {
  const modernizrFeatures = {'feature-detects': ['css/filters', 'css/fontface']};
  const modernizrId = hashId(modernizrVersion + JSON.stringify(modernizrFeatures));
  const modernizrName = `modernizr.${ctx.isDev ? 'dev' : modernizrId}.js`;

  buildModernizr(
    assign({minify: !ctx.isDev}, modernizrFeatures),
    (modernizrResult) => cb({name: modernizrName, content: modernizrResult})
  );
};

const buildFiles = (context, done) => {
  const templateContext = assign({
    id: new Date().valueOf(),
    indexName: isDev ? 'index.html' : '200.html',
    manifestName: 'cache.appcache'
  }, context);

  // Build modernizr and when its done, build the rest of the files
  modernizr(
    templateContext,
    (options) => {
      assign(templateContext, {modernizrName: options.name});
      done(null, {
        CNAME: homepage.replace(/^https?:\/\//, ''),
        [templateContext.modernizrName]: options.content,
        [templateContext.manifestName]: manifest(templateContext),
        // Build an index file for testing locally too
        'index.html': template(templateContext),
        '200.html': template(templateContext)
      });
    }
  );
};

const mergeArrays = (a, b) => mergeWith({}, a, b, (objValue, srcValue) => {
  if (Array.isArray(objValue)) return objValue.concat(srcValue);
  return void 0;
});

const config = webpackConfig({
  isDev,
  'in': 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: buildFiles
});

const replaceLoader = (match, options) => {
  config.module.rules.forEach((loader) => {
    if (loader && loader.use) {
      const matchedIndex = loader.use.findIndex((usedLoader) => (usedLoader.loader || usedLoader) === match);
      const matchedLoader = loader.use[matchedIndex];
      if (matchedLoader) {
        loader.use[matchedIndex] = typeof matchedLoader === 'string'
          ? {loader: matchedLoader, options}
          : mergeArrays(matchedLoader, {options});
      }
    }
  });
};

// Happy, debuggable selectors in dev. Super compact selectors in prod.
replaceLoader('css-loader', {
  minimize: isDev ? false : {discardComments: {removeAll: true}},
  modules: true,
  localIdentName: `${isDev ? '[path][name]___[local]___' : ''}[hash:base64:5]`
});

module.exports = config;
