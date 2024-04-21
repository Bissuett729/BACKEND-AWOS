import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  
  @Prop({required: true})
  name: string;

  @Prop({required: false, default: null})
  age: number;

  @Prop({required: true})
  email: string;

  @Prop({required: false, default: Date.now})
  registerDate: Date;

  @Prop({required: true})
  password: string;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Groups' }], default: [] })
  groups: Types.ObjectId[] = [];

  @Prop({required: false, default: null})
  imgProfile: string = '';

  @Prop({required: false, default: null})
  phone: string = '';

  @Prop({required: false, default: null})
  color: string = '';

  @Prop({required: false, default: true})
  active: boolean = true;

}

export const UserSchema = SchemaFactory.createForClass(Users);