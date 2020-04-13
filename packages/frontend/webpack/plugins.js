/* eslint-disable @typescript-eslint/no-var-requires */
import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { currentDirectory } from './envs';
import WebpackBar from 'webpackbar';

const plugins = [
  // getDotenv(env),
  new WebpackBar({
    color: '#268bd2',
    minimal: false,
    compiledIn: false,
  }),
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(currentDirectory, 'public', 'index.html'),
    filename: 'index.html',
    minify: {
      removeComments: true,
      removeEmptyAttributes: true,
    },
  }),
  new ExtractCssChunks({
    filename: 'css/[name].min.css',
  }),
];

export default plugins;
