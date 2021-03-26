import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { IReportDocument, IReportModel } from '@interfaces';

export const reportSchema = new Schema<IReportDocument, IReportModel>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportDate: { type: Date, required: true },
    taskType: {
      type: String,
      enum: ['Development', 'Bug-fixing', 'Studying', 'Estimating', 'Meeting'],
      default: 'Development',
      required: true,
    },
    workedMinutes: { type: Number, required: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { versionKey: false },
);

reportSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});
reportSchema.plugin(mongoose_paginate);

const reportModel = model<IReportDocument, IReportModel>(
  'Report',
  reportSchema,
);
export default reportModel;
