import { Router } from 'express';

import adminRouter from './admin.router';
import authRouter from './auth.router';
import userRouter from './user.router';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/admin', adminRouter);
routes.use('/user', userRouter);

export default routes;
