import Joi from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    label: Joi.string(),
    parent: Joi.string(),
    image: Joi.string().required(),
  }),
};
