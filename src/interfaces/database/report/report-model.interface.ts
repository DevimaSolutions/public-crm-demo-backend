import { PaginateModel } from 'mongoose';

import { IReportDocument } from '@interfaces';

export interface IReportModel extends PaginateModel<IReportDocument> {}
