const Joi = require('@hapi/joi');

const paginationSchema = Joi.object().keys({
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

const any = Joi.alternatives().try(
  Joi.string(),
  Joi.number(),
  Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
);

const whereSchema = Joi.array().items(
  Joi.object().keys({
    field: Joi.string().required(),
    op: Joi.string()
      .valid('=', '>', '<', '>=', '<=', 'like', 'ilike', 'in')
      .insensitive()
      .default('='),
    value: any.required(),
  }),
);

const orderSchema = Joi.array().items(
  Joi.object().keys({
    field: Joi.string().required(),
    orientation: Joi.string()
      .valid('asc', 'desc')
      .insensitive()
      .default('asc'),
  }),
);

module.exports = Joi.object({
  pagination: paginationSchema,
  where: whereSchema,
  order: orderSchema,
});
