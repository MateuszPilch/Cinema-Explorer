import { Expose } from 'class-transformer';
import { MapData } from './map-data';

export class MapDetails { 
  @Expose()
  id!: number;

  @Expose()
  mapData!: MapData[];

  @Expose()
  name!: string;

  @Expose()
  poster_path!: string;

  @Expose()
  runtime!: string;

  @Expose()
  title!: string;
}