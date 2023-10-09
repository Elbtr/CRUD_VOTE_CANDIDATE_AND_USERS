import * as Joi from "joi";

export const createCandidateScema = Joi.object({
  name: Joi.string().required().min(5),
  visi: Joi.string().required().min(10),
  image: Joi.string().required(),
});
