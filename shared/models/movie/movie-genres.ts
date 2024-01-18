import { Expose } from 'class-transformer';

export class MovieGenres{
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}