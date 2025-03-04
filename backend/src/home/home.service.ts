import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { SearchData } from '../../../shared/models/search-data';

@Injectable()
export class HomeService {

  constructor(private readonly httpService: HttpService) {}

  async getTrendingResults(time_window: string): Promise<SearchData> {
    const url = `https://api.themoviedb.org/3/trending/all/${time_window}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url, headers))
    data.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
    const res = plainToInstance(SearchData, data, { excludeExtraneousValues: true });
    return res;
  }
}
