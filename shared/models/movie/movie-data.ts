import { Expose } from 'class-transformer';
import { MovieDetails } from './movie-details'

export class MovieData
{
  
  @Expose()
  page!: number;

  @Expose()
  results!: MovieDetails[];

  @Expose()
  total_pages!: number
  
  @Expose()
  total_results!: number;
}