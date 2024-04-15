import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotesDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {
  
  @Prop({required: true})
  title: string;

  @Prop({required: true, default: null})
  icon: string;

  @Prop({required: true, default: null})
  image: string;

  @Prop({required: true, default: null})
  summary: string;

  @Prop({required: false, default: null})
  typeOfImg: string;

  @Prop({required: true, default: null})
  titleOfImg: string;

  @Prop({required: false, default: []})
  comments: Array<any>;

  @Prop({required: false, default: Date.now})
  registerDate: Date;

  @Prop({required: false, default: true})
  active: boolean = true;

}

export const Noteschema = SchemaFactory.createForClass(Notes);