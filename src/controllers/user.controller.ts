import { Request, Response } from 'express';

import { successResponseHandler } from '@responses';
import { userService } from '@services';

const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id);
  res.json(successResponseHandler.getSuccessResponseWithData(user));
};

const createReport = async (req: Request, res: Response) => {
  const report = await userService.createReport(
    req.body.projectId,
    req.body.taskId,
    req.body.userId,
    req.body.time,
    req.body.reportDate,
    req.body.description,
  );
  res.json(successResponseHandler.getSuccessResponseWithData(report));
};

const getReports = async (req: Request, res: Response) => {
  const users = await userService.getAllUserReports(req.params.id);
  res.json(successResponseHandler.getSuccessResponseWithData(users));
};

const updateProfile = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(successResponseHandler.getSuccessResponseWithData(user));
};

const deleteProfile = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.json(successResponseHandler.getSuccessResponse());
};

const changePassword = async (req: Request, res: Response) => {
  const user = await userService.changePassword(
    req.params.id,
    req.body.password,
  );
  res.json(successResponseHandler.getSuccessResponseWithData(user));
};

const multerSingle = (req: Request, res: Response) => {
  const fileData = req.file;
  res.json(successResponseHandler.getSuccessResponseWithData(fileData.path));
};

const multerMultiple = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const paths = files.map((file: Express.Multer.File) => file.path);
  res.json(successResponseHandler.getSuccessResponseWithData(paths));
};

export default {
  getUser,
  createReport,
  getReports,
  updateProfile,
  deleteProfile,
  changePassword,
  multerSingle,
  multerMultiple,
};
