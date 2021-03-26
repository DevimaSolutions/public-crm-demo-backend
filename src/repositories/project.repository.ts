import { IProject } from '@interfaces';
import { projectModel } from '@models';
import { getPaginationValue } from '@utils';

const create = (project: IProject) => projectModel.create(project);

const getById = (id: string) => projectModel.findById(id);

const getPaginateProjects = (filter: object = {}, page = 0, limit = 0) =>
  projectModel.paginate(filter, getPaginationValue(page, limit));

const getAllProjects = () =>
  projectModel
    .find()
    .populate('users')
    .select('created_at project_name tasks users status');

const attachUserToProject = (projectId: string, userId: string) =>
  projectModel.updateOne({ _id: projectId }, { $push: { users: userId } });

export default {
  create,
  getById,
  getAllProjects,
  getPaginateProjects,
  attachUserToProject,
};
