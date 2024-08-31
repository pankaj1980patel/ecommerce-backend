import Joi from "joi";

export const authSchemaCreate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required()
});

export const authSchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required()
});
