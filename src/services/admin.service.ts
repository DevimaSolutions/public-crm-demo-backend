import { errorMessages } from '@constants';
import { IProject } from '@interfaces';
import { ClientError } from '@models';
import { projectRepository, userRepository } from '@repositories';
import { isDuplicateMongoError } from '@utils';

const createProject = (project: IProject) => {
  try {
    return projectRepository.create(project);
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      throw new ClientError(errorMessages.entityAlreadyExist);
    }
    throw error;
  }
};

const attachUserToProject = async (userId: string, projectId: string) => {
  const user = await userRepository.getById(userId).exec();
  const project = await projectRepository.getById(projectId).exec();

  return projectRepository.attachUserToProject(project?._id, user?._id);
};

const getAllUsers = async () => {
  const usersList = await userRepository.getAllUsers();
  const formattedData = usersList.docs.map((item) => ({
    id: item.id,
    fullName: `${item.firstName} ${item.lastName}`,
    email: item.email,
    phoneNumber: item.phoneNumber,
    timeType: item.timeType,
    role: item.role,
    status: item.status,
  }));

  return formattedData;
};

const getAllProjects = () => projectRepository.getAllProjects().exec();

export default {
  createProject,
  attachUserToProject,
  getAllProjects,
  getAllUsers,
};
