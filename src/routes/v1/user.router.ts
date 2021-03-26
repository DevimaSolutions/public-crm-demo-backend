import { Router } from 'express';

import { userController as userControllerObject } from '@controllers';
import { authMiddleware, uploadMiddleware } from '@middlewares';
import { errorHandler } from '@utils';

const userController = errorHandler(userControllerObject);
const userRouter = Router();

userRouter.get(
  '/user/:id',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  userController.getUser,
);

userRouter.post(
  '/report',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  userController.createReport,
);

userRouter.get(
  '/reports/:id',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  userController.getReports,
);

userRouter.put(
  '/updateProfile/:id',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  userController.updateProfile,
);

userRouter.put(
  '/updatePassword/:id',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  userController.changePassword,
);

userRouter.delete(
  '/deleteProfile/:id',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['Admin']),
  userController.deleteProfile,
);

userRouter.post(
  '/uploadFile',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  uploadMiddleware.single('file'),
  userController.multerSingle,
);

userRouter.post(
  '/uploadFiles',
  authMiddleware.checkToken,
  authMiddleware.verifyRole(['User']),
  uploadMiddleware.array('files', 5),
  userController.multerMultiple,
);

export default userRouter;
