const { outputPath } = require('./paths');

module.exports = {
  stats: 'errors-only',
  clientLogLevel: 'warning',
  contentBase: outputPath,
  inline: true,
  hot: true,
  historyApiFallback: true,
  publicPath: '/',
  port: 3000,
  allowedHosts: ['bs-local.com'], // allow browserstack
};
