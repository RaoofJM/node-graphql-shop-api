import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    product: Joi.string().required(),
    user: Joi.string().required(),
    valueSurveys: Joi.array().items(Joi.required()).required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    negative: Joi.array().items(Joi.string()),
    positive: Joi.array().items(Joi.string()),
  }),
  find: Joi.object().keys({
    product: Joi.string().required(),
    page: Joi.number(),
    limit: Joi.number(),
  }),
  createValueSurvey: Joi.object().keys({
    survey: Joi.string().required(),
    value: Joi.number().required(),
  }),
};
