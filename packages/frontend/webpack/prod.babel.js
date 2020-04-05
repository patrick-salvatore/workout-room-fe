/* eslint-disable @typescript-eslint/camelcase */
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlMinifierPlugin from 'html-minifier-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import merge from 'webpack-merge';
import common from './common';

export default function(env, argv) {
  const isProd = argv.mode === 'production';

  const minify = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
  };

  const plugins = [
    new CompressionPlugin({
      test: /\.js$|\.css$|\.png$|\.jpg$|\.woff|\.woff2$/,
      threshold: 8192,
      minRatio: 0.7,
    }),
    isProd && new Visualizer(),
    new HtmlMinifierPlugin(minify),
  ];

  const prod = {
    mode: 'production',
    optimization: {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: !isProd,
          terserOptions: {
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            cache: true,
          },
        }),
      ],
    },
    plugins,
  };

  return merge(common, prod);
}
