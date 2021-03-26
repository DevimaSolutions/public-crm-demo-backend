import { Document } from 'mongoose';

import { INotification, IUserDocument } from '@interfaces';

export interface INotificationBaseDocument extends INotification, Document {}

export interface INotificationDocument extends INotificationBaseDocument {
  user: IUserDocument['_id'];
}
export interface INotificationPopulatedDocument
  extends INotificationBaseDocument {
  user: IUserDocument;
}
