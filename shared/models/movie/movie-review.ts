import { Expose } from 'class-transformer';

export class MovieReview
{

  @Expose()
  movie_id!: number;

  @Expose()
  title!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  rating!: number;

  @Expose()
  review!: string;

  @Expose()
  favourite!: boolean;

  @Expose()
  to_watch!: boolean;
}