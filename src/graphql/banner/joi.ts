import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    category: Joi.string().required(),
    image: Joi.string().required(),
    default: Joi.boolean(),
  }),
  find: Joi.object().keys({
    category: Joi.string().required(),
  }),
};
