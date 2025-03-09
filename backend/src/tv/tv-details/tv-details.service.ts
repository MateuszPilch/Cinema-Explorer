import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MediaDetails } from '../../../../shared/models/media/media-details';
import { plainToInstance } from "class-transformer"; 
import { MediaImages } from '../../../../shared/models/media/media-images';

@Injectable()
export class TvDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async getTvDetails(id: string): Promise<MediaDetails> {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToInstance(MediaDetails, data, { excludeExtraneousValues: false });
    return res;
  }

  async getTvImages(tv_id: string): Promise<MediaImages> {
    const url = `https://api.themoviedb.org/3/tv/${tv_id}/images?include_image_language=null`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`,
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url, headers));
    const res = plainToInstance(MediaImages, data, { excludeExtraneousValues: false });
    return res;
  }
}