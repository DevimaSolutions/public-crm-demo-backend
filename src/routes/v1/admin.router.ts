import { Router } from 'express';

import { adminController as adminControllerObject } from '@controllers';
import { authMiddleware } from '@middlewares';
import { errorHandler } from '@utils';

const adminController = errorHandler(adminControllerObject);
const adminRouter = Router();

adminRouter.post(
  '/',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['Admin']),
  adminController.createProject,
);

adminRouter.post(
  '/user/:id/project/:projectid',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['Admin']),
  adminController.attachUser,
);

adminRouter.get(
  '/users',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['Admin']),
  adminController.getAllUsers,
);

adminRouter.get(
  '/projects',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['Admin']),
  adminController.getAllProjects,
);

export default adminRouter;
