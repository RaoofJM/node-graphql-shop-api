import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    label: Joi.string(),
    spec: Joi.array().items(Joi.string()).required(),
  }),
};
