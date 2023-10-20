import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MovieDetails } from 'shared/models/movie-details';
import { response } from 'express';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieDetails(movie_id: string): Promise<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=pl-PL&append_to_response=credits`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers));
    return data;
  }
}
