import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MovieSearchFilter } from 'shared/models/movie/movie-search-filter';
import { firstValueFrom } from 'rxjs';
import { MediaData } from 'shared/models/media/media-data';

@Injectable()
export class MoviePageService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieData(params: MovieSearchFilter): Promise<MediaData> {
    const url = `https://api.themoviedb.org/3/discover/movie/?language=pl-PL`;
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
