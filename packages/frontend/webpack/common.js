/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import plugins from './plugins';
import { rules } from './loaders';
import { jsFolder, outputPath, entryPath } from './paths';

export const dirName = path.join(__dirname, '../');

const entry = {
  vendor: 'react',
  bundle: entryPath,
};

const output = {
  publicPath: '/',
  path: outputPath,
  filename: `${jsFolder}/[name].min.js`,
  chunkFilename: `${jsFolder}/[name].min.js`,
};

const optimization = {
  runtimeChunk: 'single',
  namedChunks: true,
  sideEffects: true,
  splitChunks: {
    chunks: 'async',
    minSize: 10000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 5,
    automaticNameDelimiter: '/',
    name: 'common-chunk',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'async',
        name: 'vendor',
      },
    },
  },
};

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
  alias: {
    hooks: path.resolve(dirName, 'src', 'hooks'),
    components: path.resolve(dirName, 'src', 'components'),
    scss: path.resolve(dirName, 'src', 'scss'),
    pages: path.resolve(dirName, 'src', 'Pages'),
    routes: path.resolve(dirName, 'src', 'routes'),
    img: path.resolve(dirName, 'src', 'img'),
    styledComponents: path.resolve(dirName, 'src', 'styledComponents'),
    utils: path.resolve(dirName, 'src', 'utils'),
  },
};

export default {
  entry,
  output,
  optimization,
  resolve,
  module: { rules, strictExportPresence: true },
  plugins: [...plugins],
};
