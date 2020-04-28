import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const htmlLoader = {
  test: /\/.html$/,
  loader: 'html-loader',
};

const tsLoader = {
  test: /(tsx|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'awesome-typescript-loader',
  },
};

const stylesLoader = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader',
    'sass-loader',
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
