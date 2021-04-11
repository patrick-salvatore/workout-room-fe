const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack/common');
const { outputDir } = require('./webpack/paths');

module.exports = merge(common, {
  mode: 'development',
  cache: {
    type: 'filesystem',
    buildDependencies: { config: [__filename] },
  },
  devtool: 'source-map',
  resolve: {
    plugins: [
      new ForkTsCheckerNotifierWebpackPlugin({
        title: 'TypeScript',
        excludeWarnings: true,
      }),
    ],
  },
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
  plugins: [new ReactRefreshWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
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
