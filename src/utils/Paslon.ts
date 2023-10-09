import * as Joi from "joi";

export const createPaslonScema = Joi.object({
  name: Joi.string().required().min(6),
  visi: Joi.string().required().min(10),
  image: Joi.string().required(),
});
