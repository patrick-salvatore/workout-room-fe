import CompressionPlugin from 'compression-webpack-plugin';
import HtmlMinifierPlugin from 'html-minifier-webpack-plugin';
import { merge } from 'webpack-merge';
import common from './webpack/common';
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';

export default merge(common, {
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
          _loader,
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
