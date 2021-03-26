export interface IHistory {
  rate: number;
  createdAt: Date;
  status: string;
  position: string;
  paidDayOffLimit: number;
}
export default interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  status: string;
  timeType: string;
  rate: number;
  history: IHistory[];
  paidDayOffLimit: number;
  position: string;
  hireDate: Date;
}
