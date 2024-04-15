import { Types } from 'mongoose';

export interface responseNotes {
  response: notes[];
  count: number;
}

export interface notes {
  _id?: Types.ObjectId;
  title: string;
  icon: string;
  image: string;
  summary: string;
  typeOfImg: string;
  titleOfImg: string;
  comments: Array<any>;
  registerDate: Date;
  active: boolean;
}
