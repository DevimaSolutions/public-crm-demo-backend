import { Document, Types } from 'mongoose';

import { IHistory, IUser } from '@interfaces';

export interface IUserDocument extends IUser, Document {
  fullName: string;
  history: Types.Array<IHistory>;
}
