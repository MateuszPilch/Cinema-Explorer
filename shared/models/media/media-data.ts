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

  constructor() {
    this.page = 1;
    this.results = [];
    this.total_pages = 1;
    this.total_results = 0;
  }
}