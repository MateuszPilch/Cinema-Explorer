import { Controller, Post, Param, Query, Body, UseGuards, Req, Get } from '@nestjs/common';
import { MovieDetailsService } from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MediaData } from 'shared/models/media/media-data';
import { MediaSearchFilter } from 'shared/models/media/media-search-filter';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { MoviePageService } from './movie-page/movie-page.service';

@Controller('movie')
export class MovieController {
  
  constructor(
    private readonly moviePageService: MoviePageService,
    private readonly movieDetailsService: MovieDetailsService, 
    private readonly movieCreditsService: MovieCreditsService
  ) {}

  @Get()
  getMovieData(@Query() params: MediaSearchFilter): Promise<MediaData> {
    return this.moviePageService.getMovieData(params);
  }

  @Get(':id')
  getMovieDetails(@Param('id') param: string): Promise<MediaDetails> {
    return this.movieDetailsService.getMovieDetails(param);
  }

  @Get(':id/credits')
  getMovieCredits(@Param('id') param: string): Promise<MediaCredits> {
    return this.movieCreditsService.getMovieCredits(param);
  }

  @Get(':id/credits_short')
  getMovieCreditsShort(@Param('id') param: string): Promise<MediaCredits> {
    return this.movieCreditsService.getMovieCreditsShort(param);
  }
}