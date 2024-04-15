import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Note' }], default: [] })
  notes: Types.ObjectId[] = [];

  @Prop({required: false, default: Date.now})
  registerDate: Date;

  @Prop({required: false, default: true})
  active: boolean = true;

}

export const GroupSchema = SchemaFactory.createForClass(Groups);