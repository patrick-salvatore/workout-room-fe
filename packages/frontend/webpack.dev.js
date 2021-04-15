import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';

import common from './webpack/common';
import { outputDir } from './webpack/paths';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
    }),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devServer: {
    stats: 'errors-only',
    clientLogLevel: 'warning',
    contentBase: outputDir,
    inline: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    port: 3000,
    allowedHosts: ['bs-local.com'], // allow browserstack
  },
});
