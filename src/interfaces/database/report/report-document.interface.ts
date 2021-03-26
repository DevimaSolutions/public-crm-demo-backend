import { Document } from 'mongoose';

import { IReport } from '@interfaces';

import { IProjectDocument } from '../project';
import { IUserDocument } from '../user';

export interface IReportBaseDocument extends IReport, Document {}

export interface IReportDocument extends IReportBaseDocument {
  project: IProjectDocument['_id'];
  user: IUserDocument['_id'];
}
export interface IReportPopulatedDocument extends IReportBaseDocument {
  project: IProjectDocument;
  user: IUserDocument;
}
