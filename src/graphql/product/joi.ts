import Joi, { string } from "joi";

export default {
  create: Joi.object().keys({
    fname: Joi.string().required(),
    ename: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    attribute: Joi.array().items().required(),
    details: Joi.array().items().required(),
    description: Joi.string().required(),
    mainImage: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
  }),
  attributeCreate: Joi.object().keys({
    warranty: Joi.string().required(),
    seller: Joi.string().required(),
    color: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
  }),
  detailCreate: Joi.object().keys({
    productDetail: Joi.string().required(),
    value: Joi.string().required(),
    label: Joi.string(),
  }),
};
