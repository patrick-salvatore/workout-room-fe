import webpackProd from './webpack.prod';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

export default env =>
  merge(webpackProd(env), {
    plugins: [new BundleAnalyzerPlugin()],
  });
