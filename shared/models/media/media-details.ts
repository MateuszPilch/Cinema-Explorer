import { Expose } from 'class-transformer';

export class MediaDetails {
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
  number_of_seasons!: number;

  @Expose()
  number_of_episodes!: string;

  @Expose()
  original_name! : string;

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