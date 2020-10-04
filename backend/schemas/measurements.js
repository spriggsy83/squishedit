const Joi = require('joi');

exports.create = Joi.object().keys({
  clientId: Joi.string().required(),
  recorderName: Joi.string().required(),
  measuredOn: Joi.date().required(),
  enteredAt: Joi.date().allow(null),
  limb: Joi.string().required(),
  notes: Joi.string().allow(null),
  aCirc: Joi.number().positive().allow(null),
  bCirc: Joi.number().positive().allow(null),
  b1Circ: Joi.number().positive().allow(null),
  cCirc: Joi.number().positive().allow(null),
  c1Circ: Joi.number().positive().allow(null),
  dCirc: Joi.number().positive().allow(null),
  eCirc: Joi.number().positive().allow(null),
  e1Circ: Joi.number().positive().allow(null),
  fCirc: Joi.number().positive().allow(null),
  gCirc: Joi.number().positive().allow(null),
  yCirc: Joi.number().positive().allow(null),
});
