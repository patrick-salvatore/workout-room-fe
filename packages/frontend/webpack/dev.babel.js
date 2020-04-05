import merge from 'webpack-merge';
import devServer from './devServer';
import config from './common';
import webpack from 'webpack';

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: true,
  },
  devServer: devServer,
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
