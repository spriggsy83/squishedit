const Joi = require('@hapi/joi');

exports.create = Joi.object().keys({
  name: Joi.string().required(),
  limb: Joi.string().required(),
  type: Joi.string().required(),
  compressionLevel: Joi.string().required(),
  brand: Joi.string().required(),
  sizeLabel: Joi.string().required(),
  lengths: Joi.string().allow(null),
  notes: Joi.string().allow(null),
  aMin: Joi.number()
    .positive()
    .allow(null),
  aMax: Joi.number()
    .greater(Joi.ref('aMin'))
    .allow(null),
  bMin: Joi.number()
    .positive()
    .allow(null),
  bMax: Joi.number()
    .greater(Joi.ref('bMin'))
    .allow(null),
  b1Min: Joi.number()
    .positive()
    .allow(null),
  b1Max: Joi.number()
    .greater(Joi.ref('b1Min'))
    .allow(null),
  cMin: Joi.number()
    .positive()
    .allow(null),
  cMax: Joi.number()
    .greater(Joi.ref('cMin'))
    .allow(null),
  c1Min: Joi.number()
    .positive()
    .allow(null),
  c1Max: Joi.number()
    .greater(Joi.ref('c1Min'))
    .allow(null),
  dMin: Joi.number()
    .positive()
    .allow(null),
  dMax: Joi.number()
    .greater(Joi.ref('dMin'))
    .allow(null),
  eMin: Joi.number()
    .positive()
    .allow(null),
  eMax: Joi.number()
    .greater(Joi.ref('eMin'))
    .allow(null),
  e1Min: Joi.number()
    .positive()
    .allow(null),
  e1Max: Joi.number()
    .greater(Joi.ref('e1Min'))
    .allow(null),
  fMin: Joi.number()
    .positive()
    .allow(null),
  fMax: Joi.number()
    .greater(Joi.ref('fMin'))
    .allow(null),
  gMin: Joi.number()
    .positive()
    .allow(null),
  gMax: Joi.number()
    .greater(Joi.ref('gMin'))
    .allow(null),
  yMin: Joi.number()
    .positive()
    .allow(null),
  yMax: Joi.number()
    .greater(Joi.ref('yMin'))
    .allow(null),
});

exports.fitQuery = Joi.object().keys({
  margin: Joi.number()
    .min(0)
    .allow(null)
    .default(0),
  measurements: Joi.array()
    .items(
      Joi.object({
        point: Joi.string()
          .required()
          .valid('a', 'b', 'b1', 'c', 'c1', 'd', 'e', 'e1', 'f', 'g', 'y'),
        value: Joi.number()
          .positive()
          .required(),
      }),
    )
    .allow(null),
});
