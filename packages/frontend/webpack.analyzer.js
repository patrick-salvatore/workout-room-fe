const webpackProd = require('./webpack.prod');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

module.exports = (env) =>
  merge(webpackProd(env), {
    plugins: [new BundleAnalyzerPlugin()],
  });
