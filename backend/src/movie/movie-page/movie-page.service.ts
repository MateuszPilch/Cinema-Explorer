import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MovieData } from 'shared/models/movie/movie-data';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviePageService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieData(param: string): Promise<MovieData> {
    const url = `https://api.themoviedb.org/3/discover/movie/?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      },
      params: param 
    };
    console.log(headers);
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(MovieData, data, { excludeExtraneousValues: true });
    return res;
  }
}
