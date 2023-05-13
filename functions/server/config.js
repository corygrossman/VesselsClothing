const { config } = require('dotenv');

// package.json sets NODE_ENV in its scripts
const isProduction = true;

// load configuration based on environment
const { error, parsed } = config({
  path: isProduction ? '.env.production' : '.env.sandbox',
});

// export secrets stored in .env.production or .env.sandbox (based on .env.example)
module.exports = {
  ...parsed,
  isProduction,
};
