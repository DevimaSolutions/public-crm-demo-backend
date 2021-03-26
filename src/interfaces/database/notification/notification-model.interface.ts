import { PaginateModel } from 'mongoose';

import { INotificationDocument } from '@interfaces';

export interface INotificationModel
  extends PaginateModel<INotificationDocument> {}
