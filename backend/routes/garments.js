'use strict';
const router = require('express').Router();
const model = require('../models/garments');
const schemas = require('../schemas/garments');
const querySchema = require('../schemas/queries');
const Errable = require('../errors');

router.get('/', async function(req, res, next) {
  let validParams = querySchema.validate({
    pagination: req.query.pagination || {},
    where: req.query.where || [],
    order: req.query.order || [],
  });
  if (validParams.error) {
    return next(
      Errable.E(
        'Failed to validate query params',
        Errable.Kinds.fmtError,
        'garments.get',
        validParams.error,
        validParams.error.details,
      ),
    );
  }
  const { pagination, where, order } = validParams.value;
  let validFit = schemas.fitQuery.validate(req.query.fit || {});
  if (validFit.error) {
    return next(
      Errable.E(
        'Failed to validate fit query params',
        Errable.Kinds.fmtError,
        'garments.get',
        validFit.error,
        validFit.error.details,
      ),
    );
  }
  const fit = validFit.value;
  try {
    const garments = await model.list(pagination, where, order, fit);
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
    const valid = schemas.create.validate(req.body);
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
