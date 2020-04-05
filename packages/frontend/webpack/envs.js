/* WEBPACK ENVIRONMENT CONFIG */

const { APIPORT, NODE_ENV, PORT } = process.env;

module.exports = {
  APIPORT,
  currentDirectory: process.cwd(),
  inDevelopment: NODE_ENV === 'development' ? true : false,
  NODE_ENV,
  PORT,
};
