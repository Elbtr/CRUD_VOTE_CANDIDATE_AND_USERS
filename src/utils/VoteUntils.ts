import Joi from "joi";

export const voteCreateShema = Joi.object({
  paslonId: Joi.number().required(),
  user_name: Joi.string().required(),
});
