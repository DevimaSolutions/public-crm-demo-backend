import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { IUserDocument, IUserModel } from '@interfaces';

const historySchema = new Schema({
  rate: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  position: { type: String },
  paidDayOffLimit: { type: Number },
});

export const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin'], required: true },
    status: {
      type: String,
      enum: ['Active', 'Disactive'],
      default: 'Active',
      required: true,
    },
    timeType: {
      type: String,
      enum: ['Full-time', 'Part-time'],
      default: 'Full-time',
      required: true,
    },
    rate: { type: Number, required: true },
    history: [historySchema],

    paidDayOffLimit: { type: Number, required: true },
    position: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
  },

  { versionKey: false },
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});

userSchema.virtual('fullName').get(function (this: IUserDocument) {
  return this.firstName + this.lastName;
});

userSchema.plugin(mongoose_paginate);

const userModel = model<IUserDocument, IUserModel>('User', userSchema);
export default userModel;
