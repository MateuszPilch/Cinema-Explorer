import { Expose } from 'class-transformer';
import { MediaDetails } from './media-details'

export class MediaData {
  @Expose()
  page!: number;

  @Expose()
  results!: MediaDetails[];

  @Expose()
  total_pages!: number
  
  @Expose()
  total_results!: number;
}