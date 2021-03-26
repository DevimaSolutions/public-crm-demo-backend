import jwt from 'jsonwebtoken';

import { ITokenData } from '@interfaces';

import { env } from './env';

export const createJwtToken = (
  data: any = null,
  expirationTime: string = env.authorizationTokenDuration,
) => {
  const token = jwt.sign(
    {
      ...data,
    },
    env.jwtSecret,
    { expiresIn: expirationTime },
  );

  return token;
};

export const verifyJwtToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as ITokenData;

export default {
  createJwtToken,
  verifyJwtToken,
};
