import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { MediaData } from '../../../../shared/models/media/media-data';
import { TvSearchFilter } from '../../../../shared/models/tv/tv-search-filter';
import { TvGenres } from '../../../../shared/models/tv/tv-genres';

@Injectable()
export class TvPageService {

  constructor(private readonly httpService: HttpService) {}

  async getTvData(params: TvSearchFilter): Promise<MediaData> {
    const url = `https://api.themoviedb.org/3/discover/tv?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      },
      params 
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    data.results.forEach((a) => a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);

    const res = plainToInstance(MediaData, data, { excludeExtraneousValues: true });
    return res;
  }

  async GetTvGenres(): Promise<TvGenres> {
    const url = `https://api.themoviedb.org/3/genre/tv/list?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    
    const res = plainToInstance(TvGenres, data.genres, { excludeExtraneousValues: true });
    return res;
  }
}
