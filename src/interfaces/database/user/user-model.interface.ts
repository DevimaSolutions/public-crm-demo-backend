import { PaginateModel } from 'mongoose';

import { IUserDocument } from '@interfaces';

export interface IUserModel extends PaginateModel<IUserDocument> {}
