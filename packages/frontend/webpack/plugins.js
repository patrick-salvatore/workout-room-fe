const path = require('path');
// const Dotenv = require('dotenv-webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const { currentDirectory, dotEnv } = require('./envs');

const plugins = [
  // new Dotenv({
  //   path: path.resolve(__dirname, dotEnv),
  // }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].min.css',
    chunkFilename: 'css/[id].min.css',
  }),
  // new CleanWebpackPlugin(),
  // new CopyWebpackPlugin({
  //   patterns: [{ from: 'public/assets', to: 'dist/public/assets' }],
  // }),
  new HtmlWebpackPlugin({
    template: path.resolve(currentDirectory, 'public', 'index.html'),
    filename: 'index.html',
    // favicon: path.resolve(currentDirectory, 'public', 'favicon', 'favicon.ico'),
    minify: {
      removeComments: true,
      removeEmptyAttributes: true,
    },
  }),
];

module.exports = plugins;
