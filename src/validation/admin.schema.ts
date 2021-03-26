import Joi from 'joi';

export const createProjectSchema = Joi.object({
  project_name: Joi.string().required(),
  status: Joi.string().required(),
});
