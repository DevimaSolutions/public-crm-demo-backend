import { ClientError } from '@models';
import { isDevEnv } from '@utils';

const getClientErrorResponse = (error: ClientError) => {
  if (error.payload) {
    return { message: error.message, errors: error.payload };
  }

  return { message: error.message };
};

const getServerErrorResponse = (error: Error) => {
  if (isDevEnv()) {
    return { message: error.message, stack: error.stack };
  }

  return { message: 'Internal server error' };
};

export default {
  getClientErrorResponse,
  getServerErrorResponse,
};
