import { Expose } from 'class-transformer';

export class TvDetails
{
  
  @Expose()
  budget!: string;

  @Expose()
  first_air_date!: string;

  @Expose()
  genres!: Genres[];

  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  number_of_episodes!: string;

  @Expose()
  number_of_seasons!: string;

  @Expose()
  original_name!: string
  
  @Expose()
  overview!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  revenue!:number;

  @Expose()
  runtime!: string;

  @Expose()
  vote_average!: number;
}

interface Genres
{
  id: number;
  name: string;
}