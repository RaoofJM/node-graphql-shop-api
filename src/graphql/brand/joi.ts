import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    label: Joi.string(),
    category: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
  }),
};
