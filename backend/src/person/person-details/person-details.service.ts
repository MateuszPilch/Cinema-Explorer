import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { PersonDetails } from 'shared/models/person-details';
import { plainToClass } from "class-transformer"; 

@Injectable()
export class PersonDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async getPersonDetails(id: string): Promise<PersonDetails> {
    const url = `https://api.themoviedb.org/3/person/${id}?language=pl-PL&append_to_response=combined_credits`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(PersonDetails, data, { excludeExtraneousValues: false });
    return res;
  }
}
