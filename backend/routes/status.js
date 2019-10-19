'use strict';

const packageList = require('../package.json');
const router = require('express').Router();

router.get('/healthz', (req, res) => {
  return res.status(200).send('ok');
});

router.get('/version', (req, res) => {
  return res.status(200).json(packageList.version);
});

module.exports = router;
