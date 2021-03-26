import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { IDayOffDocument, IDayOffModel } from '@interfaces';

export const dayOffSchema = new Schema<IDayOffDocument, IDayOffModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dayOffType: {
      type: String,
      enum: ['Sick leave', 'Vacation', 'Day off'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Approved', 'Pending', 'Rejected'],
      required: true,
    },
    isPaid: { type: Boolean, default: true },
    submitDate: { type: Date },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comment: { type: String, required: true },
  },
  { versionKey: false },
);

dayOffSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});
dayOffSchema.plugin(mongoose_paginate);

const dayOffModel = model<IDayOffDocument, IDayOffModel>(
  'DayOff',
  dayOffSchema,
);
export default dayOffModel;
