import { Document } from 'mongoose';

import { IDayOff } from '@interfaces';

import { IUserDocument } from '../user';

export interface IDayOffBaseDocument extends IDayOff, Document {}

export interface IDayOffDocument extends IDayOffBaseDocument {
  user: IUserDocument['_id'];
}
export interface IDayOffPopulatedDocument extends IDayOffBaseDocument {
  user: IUserDocument;
}
