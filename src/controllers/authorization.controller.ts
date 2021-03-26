import { Request, Response } from 'express';

import { responseMessages } from '@constants';
import { successResponseHandler } from '@responses';
import { authorizationService, nodemailerService } from '@services';
import { validate } from '@utils';
import { createUserSchema, loginUserSchema } from '@validation';

const register = async (req: Request, res: Response) => {
  validate(createUserSchema, req.body);
  const tokens = await authorizationService.register(req.body);
  res.json(tokens);
};

const login = async (req: Request, res: Response) => {
  validate(loginUserSchema, req.body);
  const tokens = await authorizationService.login(
    req.body.email,
    req.body.password,
  );
  res.json(tokens);
};

const token = async (req: Request, res: Response) => {
  const newTokens = await authorizationService.updateToken(
    req.body.refresh_token,
  );
  res.json(newTokens);
};

const forgot = async (_req: Request, res: Response) => {
  await nodemailerService.forgotMail();
  res.json(
    successResponseHandler.getSuccessResponse(
      responseMessages.messageHasBeenSent,
    ),
  );
};

const getUser = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization ?? '';
  const user = await authorizationService.getUser(accessToken);
  res.json(user);
};

export default {
  register,
  login,
  token,
  forgot,
  getUser,
};
