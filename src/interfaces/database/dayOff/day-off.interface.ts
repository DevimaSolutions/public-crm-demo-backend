import { Types } from 'mongoose';

import { IUserDocument } from '@interfaces';

export default interface IDayOff {
  user: Types.ObjectId | IUserDocument;
  dayOffType: string;
  status: string;
  isPaid: boolean;
  submitDate: Date;
  startDate: Date;
  endDate: Date;
  comment: string;
}
