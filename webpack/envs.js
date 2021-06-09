/* WEBPACK ENVIRONMENT CONFIG */

const { APIPORT, NODE_ENV, PORT } = process.env;

module.exports = {
  APIPORT,
  currentDirectory: process.cwd(),
  inDevelopment: NODE_ENV === 'dev' ? true : false,
  NODE_ENV,
  dotEnv: `${process.cwd()}/.env.${NODE_ENV}`,
  PORT,
};
