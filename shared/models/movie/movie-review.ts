import { Expose } from 'class-transformer';

export class MovieReview
{

  @Expose()
  movie_id!: number;

  @Expose()
  rating!: number;

  @Expose()
  review!: string;

  @Expose()
  favourite!: boolean;

  @Expose()
  to_watch!: boolean;
}