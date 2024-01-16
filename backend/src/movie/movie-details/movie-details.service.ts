import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaImages } from 'shared/models/media/media-images';
import { plainToInstance } from "class-transformer"; 

@Injectable()
export class MovieDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieDetails(movie_id: string): Promise<MediaDetails> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
        
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url, headers));
    const res = plainToInstance(MediaDetails, data, { excludeExtraneousValues: true });
    return res;
  }
  async getMovieImages(movie_id: string): Promise<MediaImages> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/images?include_image_language=null`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`,
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url, headers));
    const res = plainToInstance(MediaImages, data, { excludeExtraneousValues: true });
    return res;
  }
}