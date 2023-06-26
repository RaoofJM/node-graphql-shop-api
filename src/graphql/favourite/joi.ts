import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    product: Joi.string().required(),
  }),
  find: Joi.object().keys({
    user: Joi.boolean().required(),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};
