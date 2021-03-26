import { NextFunction, Request, Response } from 'express';

type AsyncRequestHandler =
  | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
  | ((req: Request, res: Response, next: NextFunction) => void);

const errorHandler = (controller: Record<string, AsyncRequestHandler>) =>
  Object.entries(controller).reduce(
    (acc: Record<string, AsyncRequestHandler>, [key, handler]) => ({
      ...acc,
      [key]: async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handler(req, res, next);
        } catch (e) {
          next(e);
        }
      },
    }),
    {},
  );

export default errorHandler;
