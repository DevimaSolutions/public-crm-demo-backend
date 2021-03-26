import Joi from 'joi';

import { validationMessages } from '@constants';
import { ClientError } from '@models';

const validate = (validationSchema: Joi.ObjectSchema, params: object) => {
  if (!validationSchema) {
    throw new Error(validationMessages.invalidDataType);
  }

  const { error } = validationSchema.validate(params);
  if (error) {
    throw new ClientError(validationMessages.invalidInput, 400, error);
  }
};

export default validate;
