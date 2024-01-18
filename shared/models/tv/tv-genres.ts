import { Expose } from 'class-transformer';

export class TvGenres{
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}