import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {

  @Prop({ unique: true })
  nickname: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profile_picture: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);