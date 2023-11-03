import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { TvCredits } from 'shared/models/tv-credits';
import { plainToClass } from "class-transformer"; 

@Injectable()
export class TvCreditsService {
  constructor(private readonly httpService: HttpService) {}

  async getTvCredits(id: string): Promise<TvCredits> {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(TvCredits, data);
    return res;
  }

  async getTvCreditsShort(id: string): Promise<TvCredits> {
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    let res = plainToClass(TvCredits, data);
    res.cast = res.cast.slice(0,10);
    res.crew = res.crew.slice(0,10);
    return res;
  }
}
