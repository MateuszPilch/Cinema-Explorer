import { Expose } from 'class-transformer';

export class MapData {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  runtime!: string;

  @Expose()
  episode!: string;

  @Expose()
  description!: string;

  @Expose()
  center!: number[]

  @Expose()
  radius!: number;

  @Expose()
  image!: File | any;
}