import Autoprefixer from 'autoprefixer';
import Precss from 'precss';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

const htmlLoader = {
  test: /\/.html$/,
  loader: 'html-loader',
};

// const jsLoader = {
//   test: /\.(js|jsx)$/,
//   exclude: [/node_modules/, /\.test.tsx?$/],
//   use: {
//     loader: 'babel-loader',
//     options: {
//       presets: [
//         '@babel/preset-typescript',
//         '@babel/preset-react',
//         '@babel/preset-env',
//       ],
//       plugins: ['@babel/plugin-proposal-object-rest-spread'],
//     },
//   },
// };

const tsLoader = {
  test: /(tsx|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader',
  },
};

const stylesLoader = {
  test: /(\.css|\.scss|\.sass)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: ExtractCssChunks.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        autoprefixer: {
          browsers: ['last 2 versions'],
        },
        plugins: () => [Precss, Autoprefixer],
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

const imagesLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        limit: 4096,
        name: 'assets/[name].[ext]',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          quality: 75,
        },
      },
    },
  ],
};

const mediaLoader = {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: {
    loader: 'file-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[ext]',
    },
  },
};

const fontLoader = {
  test: /\.(woff|woff2|otf|ttf|eot)\??.*$/,
  use: {
    loader: 'file-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[ext]',
    },
  },
};

// const extras = {
//   enforce: 'pre',
//   test: /\.js$/,
//   loader: 'source-map-loader',
// };

export const rules = [
  htmlLoader,
  // jsLoader,
  tsLoader,
  // ...stylesLoader,
  stylesLoader,
  imagesLoader,
  mediaLoader,
  fontLoader,
  // extras,
];
