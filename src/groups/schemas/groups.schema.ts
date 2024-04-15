import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Groups>;

@Schema()
export class Groups {
  
  @Prop({required: true})
  title: string;

  @Prop({required: false})
  code: string;

  @Prop({required: true, default: null})
  description: string;

  @Prop({required: false, default: null})
  img: string;

  @Prop({required: true, default: []})
  notes: string[] = [];

  @Prop({required: false, default: Date.now})
  registerDate: Date;

  @Prop({required: false, default: true})
  active: boolean = true;

}

export const GroupSchema = SchemaFactory.createForClass(Groups);