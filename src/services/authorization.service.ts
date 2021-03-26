import bcrypt from 'bcrypt';

import { errorMessages, validationMessages } from '@constants';
import { IUser } from '@interfaces';
import { ClientError } from '@models';
import { userRepository } from '@repositories';
import { userService } from '@services';
import {
  createJwtToken,
  env,
  isDuplicateMongoError,
  verifyJwtToken,
} from '@utils';

const setAuth = async (userId: string, userRole: string) => {
  const authToken = createJwtToken(
    { id: userId, role: userRole },
    env.authorizationTokenDuration,
  );

  const refreshToken = createJwtToken(
    { id: userId, role: userRole },
    env.refreshTokenDuration,
  );

  return {
    access_token: authToken,
    refresh_token: refreshToken,
  };
};

const login = async (email: string, password: string) => {
  const user = await userRepository.getByEmail(email).exec();

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ClientError(validationMessages.invalidLogin);
  }

  return setAuth(user.id, user.role);
};

const updateToken = async (token: string) => {
  const authData = verifyJwtToken(token);
  if (!authData) {
    throw new ClientError(validationMessages.invalidAuthorizationToken);
  }

  return setAuth(authData.id, authData.role);
};

const register = async (user: IUser) => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
  }

  try {
    const newUser = await userRepository.create(user);

    return setAuth(newUser.id, newUser.role);
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      throw new ClientError(errorMessages.entityAlreadyExist);
    }
    throw error;
  }
};

const getUser = (token: string) => {
  const authData = verifyJwtToken(token);
  if (!authData) {
    throw new ClientError(validationMessages.invalidAuthorizationToken);
  }

  return userService.getUser(authData.id);
};

export default {
  login,
  updateToken,
  register,
  getUser,
};
