import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { IEventDocument, IEventModel } from '@interfaces';

export const eventSchema = new Schema<IEventDocument, IEventModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false },
);

eventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});
eventSchema.plugin(mongoose_paginate);

const eventModel = model<IEventDocument, IEventModel>('Event', eventSchema);
export default eventModel;
