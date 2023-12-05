import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { MovieReview } from 'shared/models/movie/movie-review';
import { MovieReviewDto } from 'src/user/dto/moviereview.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {

  constructor(private readonly httpService: HttpService, 
    @InjectModel(User.name) private userModel: Model<User>) {}
  
  async getMovieList(_id: string): Promise<MovieReview[]> {
    const data = await this.userModel.findById(_id);
    const res = data.movie_list;

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
        title: movieReview.title,
        poster_path: movieReview.poster_path,
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
