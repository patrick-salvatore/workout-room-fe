const htmlLoader = {
  test: /\/.html$/,
  loader: 'html-loader',
};

const tsLoader = {
  test: /\.(ts|tsx)$/,
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
  },
};

const imagesLoader = {
  test: /\.(png|jpg|gif)$/,
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
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: {
    loader: 'file-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[ext]',
    },
  },
};

const fileLoader = {
  test: /\.(pdf)$/,
  use: {
    loader: 'file-loader',
    options: {
      limit: 10000,
      name: 'static/[name].[ext]',
    },
  },
};

const svgLoader = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};

module.exports = [
  htmlLoader,
  tsLoader,
  imagesLoader,
  svgLoader,
  mediaLoader,
  fontLoader,
  fileLoader,
];
