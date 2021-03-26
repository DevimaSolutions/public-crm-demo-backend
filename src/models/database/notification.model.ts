import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { INotificationDocument, INotificationModel } from '@interfaces';

export const notificationSchema = new Schema<
  INotificationDocument,
  INotificationModel
>(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['Birthday', 'Warning', 'Meeting', 'Approval'],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createDate: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

notificationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});
notificationSchema.plugin(mongoose_paginate);

const notificationModel = model<INotificationDocument, INotificationModel>(
  'Notification',
  notificationSchema,
);
export default notificationModel;
