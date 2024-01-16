import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { MediaData } from 'shared/models/media/media-data';
import { TvSearchFilter } from 'shared/models/tv/tv-search-filter';

@Injectable()
export class TvPageService {

  constructor(private readonly httpService: HttpService) {}

  async getTvData(params: TvSearchFilter): Promise<MediaData> {
    const url = `https://api.themoviedb.org/3/discover/tv/?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      },
      params 
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToInstance(MediaData, data, { excludeExtraneousValues: true });
    return res;
  }
}
