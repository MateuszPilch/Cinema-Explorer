import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { plainToClass } from "class-transformer"; 

@Injectable()
export class TvDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async getTvDetails(id: string): Promise<MediaDetails> {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(MediaDetails, data, { excludeExtraneousValues: true });
    return res;
  }
}