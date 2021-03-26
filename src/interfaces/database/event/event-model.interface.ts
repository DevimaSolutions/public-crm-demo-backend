import { PaginateModel } from 'mongoose';

import { IEventDocument } from '@interfaces';

export interface IEventModel extends PaginateModel<IEventDocument> {}
