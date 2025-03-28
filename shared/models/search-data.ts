import { Expose } from 'class-transformer';

export class SearchData {
  @Expose()
  page!: number;

  @Expose()
  results!: Results[];

  @Expose()
  total_pages!: number;
  
  @Expose()
  total_results!: number;

  constructor() {
    this.page = 1;
    this.results = [];
    this.total_pages = 1;
    this.total_results = 0;
  }
}

interface Results {
  avatar?: any;
  backdrop_path?: string;
  first_air_date? : string;
  id?: number;
  known_for?: any[];
  known_for_department?: string;
  media_type?: string;
  name?: string;
  nickname?: string;
  original_name?: string;
  original_title?: string;
  overview?: string;
  popularity?: number
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
}
