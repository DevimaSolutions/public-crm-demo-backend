import { IReportData } from '@interfaces';
import { reportModel } from '@models';

const getUserReports = (userId: string) =>
  reportModel
    .find({ user: userId })
    .populate('user', 'email')
    .select('tasks user workMinutes rate salary description');

const createReport = (reportDTO: IReportData, rate: number) =>
  reportModel.create({
    projectId: reportDTO.projectId,
    user: reportDTO.userId,
    task: reportDTO.taskId,
    created_at: reportDTO.reportDate,
    workMinutes: reportDTO.workMinutes,
    rate,
    description: reportDTO.description,
  });

export default {
  getUserReports,
  createReport,
};
