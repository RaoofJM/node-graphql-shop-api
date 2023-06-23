import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    label: Joi.string(),
    category: Joi.string().required(),
  }),
  find: Joi.object().keys({
    category: Joi.string().required(),
  }),
};
