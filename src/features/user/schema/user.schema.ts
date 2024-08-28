import Joi from "joi";

export const userSchemaCreate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
  avatar: Joi.string().optional(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required()
});
