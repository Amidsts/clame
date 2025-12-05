import Joi from "joi";

export const searchProductSchema = Joi.object({
  productInfo: Joi.string().required(),
});
