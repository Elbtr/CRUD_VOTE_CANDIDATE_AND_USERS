import Joi from "joi";

export const PartiesSchema = Joi.object({
  party_name: Joi.string().required().min(5),
  paslon: Joi.number().required(),
});
