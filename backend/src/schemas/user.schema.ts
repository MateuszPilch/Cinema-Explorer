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

  @Prop()
  movie_list: MovieList[]

  @Prop()
  tv_list: TvList[]
  
}

class MovieList {
  @Prop()
  movie_id: number;

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

class TvList {

  @Prop()
  tv_id: number;

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

export const UserSchema = SchemaFactory.createForClass(User);