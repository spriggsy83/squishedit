'use strict';
const router = require('express').Router();
const model = require('../models/garments');
const schema = require('../schemas/garments');
const querySchema = require('../schemas/queries');
const Errable = require('../errors');

router.get('/', async function(req, res, next) {
  let valid = querySchema.validate({
    pagination: req.query.pagination || {},
    where: req.query.where || [],
    order: req.query.order || [],
  });
  if (valid.error) {
    return next(
      Errable.E(
        'Failed to validate query params',
        Errable.Kinds.fmtError,
        'garments.get',
        valid.error,
        valid.error.details,
      ),
    );
  }
  const { pagination, where, order } = valid.value;
  try {
    const garments = await model.list(pagination, where, order);
    return res.json(garments);
  } catch (e) {
    return next(
      Errable.E(
        `Could not fetch garments list`,
        Errable.Kinds.external,
        'garments.get',
        e,
      ),
    );
  }
});

router.post('/', async function(req, res, next) {
  try {
    const valid = schema.validate(req.body);
    if (valid.error) {
      return next(
        Errable.E(
          'Failed to validate garment',
          Errable.Kinds.fmtError,
          'garments.post',
          valid.error,
          valid.error.details,
        ),
      );
    }
    const newGarment = await model.save(valid.value);
    //return res.json(newGarment);
    // Sqlite3 interface doesn't handle returning inserted record
    res.status(200).send('ok');
  } catch (e) {
    return next(
      Errable.E(
        'Could not save new garment',
        Errable.Kinds.external,
        'garments.post',
        e,
      ),
    );
  }
});

module.exports = router;
