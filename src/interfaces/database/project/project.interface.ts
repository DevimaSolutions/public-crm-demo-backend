import { Types } from 'mongoose';

import { IUserDocument } from '@interfaces';

interface IUserHistory {
  rate: number;
  status: string;
  changeDate: Date;
}

export interface ITeamMembers {
  user: Types.ObjectId | IUserDocument;
  rate: number;
  userHistory: IUserHistory[];
}

export default interface IProject {
  projectName: string;
  createdAt: Date;
  teamMembers: ITeamMembers[];
  status: string;
  description: string;
}
