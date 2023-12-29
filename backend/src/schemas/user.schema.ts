import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

class Avatar {
  
  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  buffer: Buffer;

  @Prop()
  size: number;
}

class MediaList {

  @Prop()
  media_id: number;

  @Prop()
  media_type: string;

  @Prop()
  title: string;

  @Prop()
  poster_path: string;

  @Prop()
  rating: number;

  @Prop()
  review: string;

  @Prop()
  to_watch: boolean;

  @Prop()
  favourite: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

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
  avatar: Avatar;

  @Prop()
  media_list: MediaList[]

}

export const UserSchema = SchemaFactory.createForClass(User);