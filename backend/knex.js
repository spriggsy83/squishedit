const knex = require('knex');
const knexStringcase = require('knex-stringcase');
const knexConf = require('./knexfile');

module.exports = knex(knexStringcase(knexConf.development));
