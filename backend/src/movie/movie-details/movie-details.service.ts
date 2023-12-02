import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { plainToClass } from "class-transformer"; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { MovieListDto } from '../dto/movielist.dto';

@Injectable()
export class MovieDetailsService {
  constructor(private readonly httpService: HttpService, 
    @InjectModel(User.name) private userModel: Model<User>) {}

  async getMovieDetails(movie_id: string): Promise<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const res = plainToClass(MovieDetails, data, { excludeExtraneousValues: true });
    return res;
  }

  async getMovieReview(_id: string, movie_id: number): Promise<any> {
    const data = await this.userModel.findById(_id);
    const res = data.movie_list.find(movie => movie.movie_id === movie_id);
    return res;
  }

  async addMovieReview(_id: string, movieList: MovieListDto): Promise<any> {
    const res = await this.userModel.findByIdAndUpdate(_id, { 
      movie_list:  
        movieList
    },{
      new: true,
      runValidators: true 
    });
    return res;
  }
}