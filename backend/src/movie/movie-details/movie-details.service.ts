import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieReview } from 'shared/models/movie/movie-review';
import { plainToClass } from "class-transformer"; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { MovieReviewDto } from '../dto/moviereview.dto';

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

  async getMovieReview(_id: string, movie_id: number): Promise<MovieReview> {
    const data = await this.userModel.findById(_id);
    const res = plainToClass(MovieReview,data.movie_list.find(movie => movie.movie_id === Number(movie_id)));

    return res;
  }

  async setMovieReview(_id: string, movieReview: MovieReviewDto): Promise<any> {
    const data = await this.userModel.findById(_id);
    const movieIndex = data.movie_list.findIndex(movie => movie.movie_id === movieReview.movie_id);
    
    if (movieIndex === -1) {
      data.movie_list.push({
        movie_id: movieReview.movie_id,
        rating: movieReview.rating,
        review: movieReview.review,
        favourite: movieReview.favourite,
        to_watch: movieReview.to_watch,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      data.movie_list[movieIndex].rating = movieReview.rating;
      data.movie_list[movieIndex].review = movieReview.review;
      data.movie_list[movieIndex].favourite = movieReview.favourite;
      data.movie_list[movieIndex].to_watch = movieReview.to_watch;
      data.movie_list[movieIndex].updatedAt = new Date(),
      data.markModified('movie_list');
    }
    await data.save();
  }
}