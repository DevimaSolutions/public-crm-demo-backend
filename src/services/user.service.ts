import bcrypt from 'bcrypt';

import { errorMessages } from '@constants';
import { IUser } from '@interfaces';
import { ClientError } from '@models';
import { reportRepository, userRepository } from '@repositories';
import { createReportData, isDuplicateMongoError, validate } from '@utils';
import { reportUserSchema } from '@validation';

const getMinutes = (time: Date) => time.getHours() * 60 + time.getMinutes();

const createReport = (
  projectId: string,
  taskId: string,
  userId: string,
  time: Date,
  reportDate: Date,
  description: string,
) => {
  const reportData = createReportData(
    projectId,
    taskId,
    userId,
    getMinutes(time),
    reportDate,
    description,
  );
  validate(reportUserSchema, reportData);

  // TODO: Implement storing rate logic by projects
  const rate = 0;

  try {
    return reportRepository.createReport(reportData, rate);
  } catch (error) {
    if (isDuplicateMongoError(error)) {
      throw new ClientError(errorMessages.entityAlreadyExist);
    }
    throw error;
  }
};

const getUser = async (userId: string) => {
  const user = await userRepository.getById(userId).exec();

  if (!user) {
    throw new ClientError(errorMessages.unknownUser);
  }

  const { password, _id, ...result } = { ...user.toObject(), id: user._id };

  return result;
};

const getAllUserReports = (userId: string) =>
  reportRepository.getUserReports(userId).exec();

const updateUser = (userId: string, user: IUser) =>
  userRepository.updateById(userId, user).exec();

const deleteUser = (userId: string) => userRepository.deleteById(userId).exec();

const changePassword = (userId: string, password: string) => {
  const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

  return userRepository.updateById(userId, { password: newPassword }).exec();
};

export default {
  createReport,
  getUser,
  getAllUserReports,
  updateUser,
  deleteUser,
  changePassword,
};
