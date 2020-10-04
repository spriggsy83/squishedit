'use strict';
const router = require('express').Router();
const model = require('../models/measurements');
const schemas = require('../schemas/measurements');
const querySchema = require('../schemas/queries');
const Errable = require('../errors');

router.get('/', async function (req, res, next) {
  let validParams = querySchema.validate({
    paging: req.query.paging || {},
    filter: req.query.filter || [],
    order: req.query.order || {},
  });
  if (validParams.error) {
    return next(
      Errable.E(
        'Failed to validate query params',
        Errable.Kinds.fmtError,
        'measurements.get',
        validParams.error,
        validParams.error.details,
      ),
    );
  }
  const { paging, filter, order } = validParams.value;
  try {
    const measurements = await model.list(paging, filter, order);
    return res.json(measurements);
  } catch (e) {
    return next(
      Errable.E(
        `Could not fetch measurements list`,
        Errable.Kinds.external,
        'measurements.get',
        e,
      ),
    );
  }
});

router.post('/', async function (req, res, next) {
  try {
    const valid = schemas.create.validate(req.body);
    if (valid.error) {
      return next(
        Errable.E(
          'Failed to validate measurement',
          Errable.Kinds.fmtError,
          'measurements.post',
          valid.error,
          valid.error.details,
        ),
      );
    }
    const newMeasurement = await model.save(valid.value);
    //return res.json(newMeasurement);
    // Sqlite3 interface doesn't handle returning inserted record
    res.status(200).send('ok');
  } catch (e) {
    return next(
      Errable.E(
        'Could not save new measurement',
        Errable.Kinds.external,
        'measurements.post',
        e,
      ),
    );
  }
});

module.exports = router;
