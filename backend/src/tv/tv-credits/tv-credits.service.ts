import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MediaCredits } from 'shared/models/media/media-credits';
import { plainToClass } from "class-transformer"; 

@Injectable()
export class TvCreditsService {
  constructor(private readonly httpService: HttpService) {}

  async getTvCredits(id: string): Promise<MediaCredits> {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(MediaCredits, data, { excludeExtraneousValues: true });
    return res;
  }

  async getTvCreditsShort(id: string): Promise<MediaCredits> {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    let res = plainToClass(MediaCredits, data, { excludeExtraneousValues: true });
    res.cast = res.cast.slice(0,10);
    res.crew = res.crew.slice(0,10);
    return res;
  }
}
