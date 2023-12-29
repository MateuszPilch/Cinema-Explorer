import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Image {

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  buffer: Buffer;

  @Prop()
  size: number;
}

class Location {

  @Prop()
  coordinates: Number[]

  @Prop()
  radius: number;
}

class MediaDetails {

  @Prop()
  name: string;

  @Prop()
  runtime: number;

  @Prop()
  episode: string;

  @Prop()
  images: Image[];

  @Prop()
  location: Location
}

@Schema({
  timestamps: true,
})

export class Maps extends Document {

  @Prop()
  media_id: number;

  @Prop()
  media_type: string;

  @Prop()
  media_details: MediaDetails[]

  @Prop()
  visible: boolean
}

export const MapsSchema = SchemaFactory.createForClass(Maps);