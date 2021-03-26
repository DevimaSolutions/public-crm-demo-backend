import { Document, Types } from 'mongoose';

import { IProject, ITeamMembers } from '@interfaces';

export interface IProjectDocument extends IProject, Document {
  teamMembers: Types.Array<ITeamMembers>;
}
