import { Request, Response } from 'express';

import { successResponseHandler } from '@responses';
import { adminService } from '@services';
import { validate } from '@utils';
import { createProjectSchema } from '@validation';

const createProject = async (req: Request, res: Response) => {
  validate(createProjectSchema, req.body);
  const project = await adminService.createProject(req.body);
  res.json(successResponseHandler.getSuccessResponseWithData(project));
};

const attachUser = async (req: Request, res: Response) => {
  const smth = await adminService.attachUserToProject(
    req.params.id,
    req.params.projectid,
  );
  res.json(successResponseHandler.getSuccessResponseWithData(smth));
};

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await adminService.getAllUsers();
  res.json(successResponseHandler.getSuccessResponseWithData(users));
};

const getAllProjects = async (_req: Request, res: Response) => {
  const projects = await adminService.getAllProjects();
  res.json(successResponseHandler.getSuccessResponseWithData(projects));
};

export default {
  createProject,
  attachUser,
  getAllUsers,
  getAllProjects,
};
