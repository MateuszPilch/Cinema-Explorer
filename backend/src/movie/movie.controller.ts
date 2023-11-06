import { Controller, Get, Param } from '@nestjs/common';
import { MovieDetailsService } from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MovieData } from 'shared/models/movie/movie-data';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieCredits } from 'shared/models/movie/movie-credits';
import { MoviePageService } from './movie-page/movie-page.service';

@Controller('movie')
export class MovieController {
  
  constructor(
    private readonly moviePageService: MoviePageService,
    private readonly movieDetailsService: MovieDetailsService, 
    private readonly movieCreditsService: MovieCreditsService
  ) {}

  @Get()
  getMovieData(@Param() param: string): Promise<MovieData> {
    return this.moviePageService.getMovieData(param);
  }

  @Get(':id')
  getMovieDetails(@Param('id') param: string): Promise<MovieDetails> {
    return this.movieDetailsService.getMovieDetails(param);
  }

  @Get(':id/credits')
  getMovieCredits(@Param('id') param: string): Promise<MovieCredits> {
    return this.movieCreditsService.getMovieCredits(param);
  }

  @Get(':id/credits_short')
  getMovieCreditsShort(@Param('id') param: string): Promise<MovieCredits> {
    return this.movieCreditsService.getMovieCreditsShort(param);
  }
}