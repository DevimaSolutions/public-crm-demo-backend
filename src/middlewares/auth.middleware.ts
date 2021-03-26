import { NextFunction, Request, Response } from 'express';

import { ClientError } from '@models';
import { verifyJwtToken } from '@utils';

export const checkToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      next(new ClientError('Unathorized', 401));

      return;
    }

    req.user = verifyJwtToken(token);
    next();
  } catch (error) {
    next(new ClientError('Unathorized', 401));
  }
};

export const verifyRole = (role: string[]) =>
  function (req: Request, _res: Response, next: NextFunction) {
    try {
      if (!role.find((i) => i === req.user.role)) {
        next(new ClientError('Forbidden', 403));

        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default {
  checkToken,
  verifyRole,
};
