import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { PersonCredits } from 'shared/models/person/person-credits';

@Injectable()
export class PersonCreditsService {
  constructor(private readonly httpService: HttpService) {}
  
  async getPersonCredits(id: string): Promise<PersonCredits> {
    const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    data.cast.sort((a, b) => b.vote_count - a.vote_count);
    data.crew.sort((a, b) => b.popularity - a.popularity);
    const res = plainToInstance(PersonCredits, data, { excludeExtraneousValues: true });
    return res;
  }
}
