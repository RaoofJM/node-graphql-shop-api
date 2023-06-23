import Joi from "joi";

export default {
  imageUpload: Joi.object()
    .keys({
      name: Joi.string().required().messages({
        "any.required": "image is required",
      }),
      size: Joi.number().max(3000000).messages({
        "number.max": "image can't be more than 3 MB",
      }),
      mimetype: Joi.string().valid("image/jpeg", "image/png").messages({
        "any.only": "only jpg and png",
      }),
    })
    .unknown(true),
};
