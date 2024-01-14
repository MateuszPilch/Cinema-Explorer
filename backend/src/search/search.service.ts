import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchData } from 'shared/models/search-data';
import { plainToClass } from "class-transformer"; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService, @InjectModel(User.name) private userModel: Model<User>) {}

  async getSearchResults(type: string, query: string, page: string): Promise<SearchData> {
    
    let data = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    };

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
    }

    if(type == 'multi' || type == 'user'){
      const users = await this.userModel.find({nickname : new RegExp(query, 'i')},'nickname');
      users.forEach((user) => {
        data.total_results = data.total_results + 1;
        data.results.push({
          nickname: user.nickname,
          media_type: 'user',
        });
      })
    }

    const res = plainToClass(SearchData, data, { excludeExtraneousValues: true });
    return res;
  }
}
