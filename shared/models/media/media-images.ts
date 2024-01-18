import { Expose } from 'class-transformer';

export class MediaImages {
  @Expose()
  backdrops!: Backdrops[];

}

interface Backdrops {
  aspect_ratio: number;
  height: number;
  file_path: string;
  width: number;
}