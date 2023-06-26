import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    default: Joi.boolean(),
  }),
};
