import { Expose } from 'class-transformer';

export class SearchData
{
  
  @Expose()
  page!: number;

  @Expose()
  results!: Results[];

  @Expose()
  total_pages!: number
  
  @Expose()
  total_results!: number;
}

interface Results
{
  backdrop_path : string;
  first_air_date : string;
  id: number;
  known_for: any[];
  known_for_department: string;
  media_type: string;
  name: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number
  poster_path: string;
  profile_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}