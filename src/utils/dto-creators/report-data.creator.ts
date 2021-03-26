import { IReportData } from '@interfaces';

const createReportData = (
  projectId: string,
  taskId: string,
  userId: string,
  workMinutes: number,
  reportDate: Date,
  description: string,
): IReportData => ({
  projectId,
  taskId,
  userId,
  workMinutes,
  reportDate,
  description,
});

export default createReportData;
