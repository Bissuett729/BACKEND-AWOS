import { Types } from 'mongoose';

export interface responseGroups {
  response: Groups[],
  count: number
}

export interface Groups {
  _id?: Types.ObjectId;
  title: string;
  code: string;
  description: string;
  registerDate: Date;
  img: string;
  notes:Types.ObjectId[];
  active: boolean;
};
