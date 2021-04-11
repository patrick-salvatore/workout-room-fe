const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const plugins = require('./plugins');
const rules = require('./loaders');
const paths = require('./paths');

const output = {
  publicPath: '/',
  path: paths.outputPath,
  filename: `${paths.jsFolder}/[name].min.js`,
  chunkFilename: `${paths.jsFolder}/[name].min.js`,
};

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
  plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
};

module.exports = {
  entry: { app: paths.entryPath },
  output,
  resolve,
  module: { rules, strictExportPresence: true },
  plugins,
};
