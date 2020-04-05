import { outputPath } from './paths';

module.exports = {
  contentBase: outputPath,
  disableHostCheck: true,
  historyApiFallback: true,
  compress: true,
  hot: true,
  host: 'localhost',
  clientLogLevel: 'silent',
  open: true,
  overlay: true,
  port: 3000,
};
