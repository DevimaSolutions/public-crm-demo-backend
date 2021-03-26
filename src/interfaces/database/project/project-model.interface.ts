import { PaginateModel } from 'mongoose';

import { IProjectDocument } from '@interfaces';

export interface IProjectModel extends PaginateModel<IProjectDocument> {}
