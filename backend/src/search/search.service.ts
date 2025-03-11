import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchData } from '../../../shared/models/search-data';
import { plainToInstance } from "class-transformer"; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService, @InjectModel(User.name) private userModel: Model<User>) {}

  async getSearchResults(type: string, query: string, page: string): Promise<SearchData> {
    
    let data = new SearchData();

    if(type != 'user') {
      const url = `https://api.themoviedb.org/3/search/${type}?language=pl-PL`;
      const headers = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_CRED}`
        },
        params: {
          query: query,
          page: page
        }
      };
      data = (await firstValueFrom(this.httpService.get(url, headers))).data;
      data.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
      data.results.sort((a, b) => b.popularity - a.popularity);
    }

    if(type == 'multi' || type == 'user'){
      const users = await this.userModel.find({nickname : new RegExp(query, 'i')},'nickname').skip((Number(page) -1)  * 20);
      users.forEach((user) => {
        data.total_results += 1;
        data.results.push({
          avatar: user.avatar,
          nickname: user.nickname,
          media_type: 'user',
        });
      })
    }

    const res = plainToInstance(SearchData, data, { excludeExtraneousValues: false });
    return res;
  }
}
