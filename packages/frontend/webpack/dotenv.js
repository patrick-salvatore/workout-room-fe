import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import webpack from 'webpack';

module.exports = env => {
  const currPath = path.join(__dirname, '../');
  const basePath = `${currPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const filePath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: filePath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((obj, next) => {
    obj[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return obj;
  }, {});

  return new webpack.DefinePlugin(envKeys);
};
