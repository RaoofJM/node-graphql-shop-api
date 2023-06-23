import Joi from "joi";

export default {
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    fullname: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
  login: Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};
