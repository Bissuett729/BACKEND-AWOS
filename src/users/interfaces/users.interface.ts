import { Types } from 'mongoose';

export interface IResponseUsers {
  response: IUsers[],
  count: number
}

export interface IUsers {
  _id?: Types.ObjectId;
  name: string;
  age: number;
  email: string;
  registerDate: Date;
  password: string;
  groups: Types.ObjectId[];
  imgProfile: string;
  phone: string;
  active: boolean;
};
