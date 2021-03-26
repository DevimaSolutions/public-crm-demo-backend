import Joi from 'joi';

export const createUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).max(15),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
  status: Joi.string().required(),
  time_type: Joi.string().required(),
  rate: Joi.number().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const reportUserSchema = Joi.object({
  projectId: Joi.string().required(),
  taskId: Joi.string().required(),
  userId: Joi.string().required(),
  workMinutes: Joi.number().required(),
  reportDate: Joi.date().required(),
  description: Joi.string().required(),
});
