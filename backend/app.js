const express = require('express');
const cors = require('cors');
var logger = require('morgan');
const Errable = require('./errors');
const config = require('./config');
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/garments', require('./routes/garments'));
app.use('/', require('./routes/status'));

// Handle errors
app.use((err, req, res, next) => {
  if (!(err instanceof Errable)) {
    err = Errable.E(
      'Internal error',
      Errable.Kinds.unexpected,
      'app.js middleware',
      err,
    );
  }
  if (config.env === 'local') {
    console.error(err.toString());
    res.status(err.code()).end(err.toString());
  } else {
    console.error(err);
    res.status(err.code()).json({ error: err.kind, details: err.details });
  }
});

module.exports = app;
