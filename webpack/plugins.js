/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

const { currentDirectory, dotEnv } = require('./envs');

const plugins = [
  // new Dotenv({
  //   path: path.resolve(__dirname, dotEnv),
  // }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].min.css',
    chunkFilename: 'css/[id].min.css',
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: 'public/fonts', to: 'fonts' }],
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(currentDirectory, 'public', 'index.html'),
    filename: 'index.html',
    minify: {
      removeComments: true,
      removeEmptyAttributes: true,
    },
  }),
];

module.exports = plugins;
