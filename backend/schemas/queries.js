const Joi = require('@hapi/joi');

const pagingSchema = Joi.object().keys({
  offset: Joi.number()
    .integer()
    .min(0)
    .default(0),
  limit: Joi.alternatives()
    .try(
      Joi.string()
        .valid('all')
        .insensitive(),
      Joi.number()
        .integer()
        .positive(),
    )
    .default(10),
});

const filterSchema = Joi.array().items(
  Joi.object().keys({
    field: Joi.string().required(),
    op: Joi.string()
      .valid('=', 'ilike')
      .insensitive()
      .default('='),
    value: Joi.alternatives().try(Joi.string(), Joi.number()),
  }),
);

const orderSchema = Joi.object().keys({
  field: Joi.string().allow(null),
  dir: Joi.string()
    .valid('asc', 'desc')
    .insensitive()
    .default('asc'),
});

module.exports = Joi.object({
  paging: pagingSchema,
  filter: filterSchema,
  order: orderSchema,
});
