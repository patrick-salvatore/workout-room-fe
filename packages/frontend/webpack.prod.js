const CompressionPlugin = require('compression-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack/common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  name: 'clientProd',
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.png$|\.jpg$|\.woff|\.woff2$/,
      threshold: 8192,
      minRatio: 0.7,
    }),
    new HtmlMinifierPlugin({
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    nodeEnv: 'production',
    flagIncludedChunks: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
    runtimeChunk: {
      name: 'manifest',
    },
  },
});
