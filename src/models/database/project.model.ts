import { model, Schema } from 'mongoose';
import mongoose_paginate from 'mongoose-paginate-v2';

import { IProjectDocument, IProjectModel } from '@interfaces';

const userHistorySchema = new Schema({
  rate: { type: Number },
  status: { type: String, enum: ['Active', 'Disactive'] },
  changeDate: { type: Date, default: Date.now },
});

const teamMembersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rate: { type: Number },
  status: { type: String, enum: ['Active', 'Disactive'] },
  teamMembers: [userHistorySchema],
});

export const projectSchema = new Schema<IProjectDocument, IProjectModel>(
  {
    createdAt: { type: Date, default: Date.now },
    projectName: { type: String, required: true },
    teamMembers: [teamMembersSchema],
    status: {
      type: String,
      enum: ['Open', 'Closed'],
      default: 'Open',
      required: true,
    },

    description: { type: String, required: true },
  },
  { versionKey: false },
);

projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc: any, ret: any) {
    delete ret._id;
  },
});
projectSchema.plugin(mongoose_paginate);

const projectModel = model<IProjectDocument, IProjectModel>(
  'Project',
  projectSchema,
);
export default projectModel;
