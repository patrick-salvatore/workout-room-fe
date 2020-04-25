import path from 'path';

module.exports = {
  root: path.join(process.cwd()), // project root directory
  publicPath: '/', // project publicPath
  outputPath: path.join(process.cwd(), 'dist'), // compiled build output path (/build)
  publicFolder: path.join(process.cwd(), 'public'), // path to public folder (./public)
  entryPath: path.join(process.cwd(), 'src', 'index.tsx'), // entry point to the application index (./src/index.js)
  templatePath: path.join(process.cwd(), 'public', 'index.html'), // path to index.html (build/index.html)
  imagesFolder: 'media', // compiled images build path (build/media)
  fontsFolder: 'assets', // compiled fonts build path (build/assets)
  cssFolder: 'css', // compiled CSS build path (build/css)
  jsFolder: 'js', // compiled JS build path (build/js)
};
