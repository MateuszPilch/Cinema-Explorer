import { Expose } from 'class-transformer';

export class MovieDetails
{
  
  @Expose()
  budget!: string;

  @Expose()
  genres!: Genres[];

  @Expose()
  overview!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  release_date!: string;

  @Expose()
  runtime!: string;

  @Expose()
  title!: string;

  @Expose()
  vote_average!: number;
}

interface Genres
{
  id: number;
  name: string;
}