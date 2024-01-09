import { Expose } from 'class-transformer';

export class MapAllLocations {
  @Expose()
  media_type!: string;

  @Expose()
  media_id!: string;

  @Expose()
  map_data!: MapData[];
}

class MapData {
  @Expose()
  _id!: string;

  @Expose()
  center!: number[]

}