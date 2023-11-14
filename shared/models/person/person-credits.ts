import { Expose } from 'class-transformer';

export class PersonCredits { 

  @Expose()
  cast!: Cast[];

  @Expose()
  crew!: Crew[];

}

interface Cast {

  id: number
  title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  name: string;
  character: string;
  first_air_date: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;

}

interface Crew {
  department: string;
  first_air_date: string;
  id: number
  job: string;
  media_type: string;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}