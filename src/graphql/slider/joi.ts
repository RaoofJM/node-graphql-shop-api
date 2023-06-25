import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    label: Joi.string(),
    images: Joi.array().items(Joi.string()).required(),
    default: Joi.boolean(),
  }),
};
