import * as Joi from '@hapi/joi';

export const creatCatSchema = Joi.object()
  .keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    age: Joi.number().required(),
    breed: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required(),
  })
  .with('name', 'age');
