import { Document } from 'mongoose';

import { IEvent } from '@interfaces';

import { IUserDocument } from '../user';

export interface IEventBaseDocument extends IEvent, Document {}

export interface IEventDocument extends IEventBaseDocument {
  user: IUserDocument['_id'];
}
export interface IEventPopulatedDocument extends IEventBaseDocument {
  user: IUserDocument;
}
