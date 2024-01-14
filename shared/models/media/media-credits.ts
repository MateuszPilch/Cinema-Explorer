import { Expose } from 'class-transformer';

export class MediaCredits {
  @Expose()
  cast!: Cast[];

  @Expose()
  crew!: Crew[];
}

interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name:string;
  order:number;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: Roles[];
  total_episode_count: number;
}

interface Crew {
  adult: boolean;
  credit_id: number;
  department: string;
  gender: number;
  id: number;
  job: string;
  jobs: Jobs[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  total_episode_count: number;
}

interface Roles {
  credit_id: string;
  character: string;
  episode_count: number;
}

interface Jobs {
  credit_id: string;
  job: string;
  episode_count: 4;
}