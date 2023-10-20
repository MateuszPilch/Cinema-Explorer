import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie-details/movie-details.service';
import { MovieDetails } from 'shared/models/movie-details';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  getMovieDetails(@Param('id') param: string): Promise<MovieDetails> {
    return this.movieService.getMovieDetails(param);
  }
}