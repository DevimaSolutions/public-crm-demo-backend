import { Types } from 'mongoose';

import { IUserDocument } from '@interfaces';

export default interface INotification {
  message: string;
  type: string;
  user: Types.ObjectId | IUserDocument;
  createDate: Date;
}
