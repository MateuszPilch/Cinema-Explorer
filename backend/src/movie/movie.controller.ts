import { Controller, Get, Post, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { MovieDetailsService } from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MovieData } from 'shared/models/movie/movie-data';
import { MovieFilter } from 'shared/models/movie/movie-filter';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieCredits } from 'shared/models/movie/movie-credits';
import { MoviePageService } from './movie-page/movie-page.service';
import { MovieListDto } from './dto/movielist.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
  
  constructor(
    private readonly moviePageService: MoviePageService,
    private readonly movieDetailsService: MovieDetailsService, 
    private readonly movieCreditsService: MovieCreditsService
  ) {}

  @Get()
  getMovieData(@Query() params: MovieFilter): Promise<MovieData> {
    return this.moviePageService.getMovieData(params);
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

  @Get('moviereview')
  @UseGuards(AuthGuard('jwt'))
  getMovieReview(@Req() req, @Param('movie_id') movie_id: number): Promise<any> {
    return this.movieDetailsService.getMovieReview(req.user._id, movie_id);
  }

  @Post('moviereview')
  @UseGuards(AuthGuard('jwt'))
  addMovieReview(@Req() req, @Body() movieList: MovieListDto): Promise<any> {
    return this.movieDetailsService.addMovieReview(req.user._id, movieList);
  }
}