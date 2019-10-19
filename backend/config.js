const _ = require('lodash');
require('dotenv').config();

const defaults = {
  env: process.env.ENV || 'local',
  port: process.env.PORT || 3001,
};

module.exports = _.merge({}, defaults);
