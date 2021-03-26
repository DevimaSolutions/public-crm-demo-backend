import { Types } from 'mongoose';

import { IProjectDocument, IUserDocument } from '@interfaces';

export default interface IReport {
  project: Types.ObjectId | IProjectDocument;
  user: Types.ObjectId | IUserDocument;
  reportDate: Date;
  taskType: string;
  workedMinutes: number;
  description: string;
  rate: number;
}
