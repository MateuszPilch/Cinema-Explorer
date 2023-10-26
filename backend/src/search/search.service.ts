import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchData } from 'shared/models/search-data';
import { plainToClass } from "class-transformer"; 

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async getSearchResults(query: string, page: string): Promise<SearchData> {
    const url = `https://api.themoviedb.org/3/search/multi?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      },
      params: {
        query: query,
        page: page
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(SearchData, data, { excludeExtraneousValues: true });
    return data;
  }
}
