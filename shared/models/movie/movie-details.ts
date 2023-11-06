import { Expose } from 'class-transformer';

export class MovieDetails
{
  
  @Expose()
  budget!: string;

  @Expose()
  genres!: Genres[];

  @Expose()
  id!: number;

  @Expose()
  original_title!: string
  
  @Expose()
  overview!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  release_date!: string;

  @Expose()
  revenue!:number;

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