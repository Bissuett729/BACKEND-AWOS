import { Types } from 'mongoose';

export interface IResponseUsers {
  response: IUsers[],
  count: number
}

export interface IUsers {
  _id?: Types.ObjectId;
  name: string;
  openingDate: Date;
  updatingDate: Date;
  active: boolean;
};
