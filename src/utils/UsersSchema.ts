import Joi from "joi";

export const UsersSchema = Joi.object({
  user_name: Joi.string().min(5).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().min(5).required(),
});
