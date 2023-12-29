import { Expose } from 'class-transformer';

export class MapDetails
{ 
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  runtime!: string;

  @Expose()
  title!: string;
}