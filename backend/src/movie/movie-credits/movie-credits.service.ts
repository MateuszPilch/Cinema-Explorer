import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MediaCredits } from '../../../../shared/models/media/media-credits';
import { plainToInstance } from "class-transformer"; 


@Injectable()
export class MovieCreditsService {
  constructor(private readonly httpService: HttpService) {}

  async getMovieCredits(movie_id: string): Promise<MediaCredits> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToInstance(MediaCredits, data,{ excludeExtraneousValues: false });

    res.cast.sort((a,b) => a.order - b.order);
    res.crew.sort((a,b) => b.popularity - a.popularity);
    
    return res;
  }

  async getMovieCreditsShort(movie_id: string): Promise<MediaCredits> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    let res = plainToInstance(MediaCredits, data, { excludeExtraneousValues: false });

    res.cast.sort((a,b) => a.order - b.order);
    res.crew.sort((a,b) => b.popularity - a.popularity);

    res.cast = res.cast.slice(0,6);
    res.crew = res.crew.slice(0,6);
    return res;
  }
}
