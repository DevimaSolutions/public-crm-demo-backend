import { Types } from 'mongoose';

import { IUserDocument } from '@interfaces';

export default interface IEvent {
  user: Types.ObjectId | IUserDocument;
  name: string;
  date: Date;
  description: string;
}
