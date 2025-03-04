import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaCredits } from '../../../shared/models/media/media-credits';
import { MediaData } from '../../../shared/models/media/media-data';
import { MediaDetails } from '../../../shared/models/media/media-details';
import { MediaImages } from '../../../shared/models/media/media-images';
import { MovieGenres } from '../../../shared/models/movie/movie-genres';
import { MovieSearchFilter } from '../../../shared/models/movie/movie-search-filter';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MovieDetailsService } from './movie-details/movie-details.service';
import { MoviePageService } from './movie-page/movie-page.service';

@Controller('movie')
export class MovieController {
  
  constructor(
    private readonly moviePageService: MoviePageService,
    private readonly movieDetailsService: MovieDetailsService, 
    private readonly movieCreditsService: MovieCreditsService
  ) {}

  @Get()
  getMovieData(@Query() params: MovieSearchFilter): Promise<MediaData> {
    return this.moviePageService.getMovieData(params);
  }

  @Get('genres')
  getMovieGenres(): Promise<MovieGenres> {
    return this.moviePageService.GetMovieGenres();
  }

  @Get(':id')
  getMovieDetails(@Param('id') id: string): Promise<MediaDetails> {
    return this.movieDetailsService.getMovieDetails(id);
  }
  
  @Get(':id/images')
  getMovieImages(@Param('id') id: string): Promise<MediaImages> {
    return this.movieDetailsService.getMovieImages(id);
  }

  @Get(':id/credits')
  getMovieCredits(@Param('id') id: string): Promise<MediaCredits> {
    return this.movieCreditsService.getMovieCredits(id);
  }

  @Get(':id/credits_short')
  getMovieCreditsShort(@Param('id') id: string): Promise<MediaCredits> {
    return this.movieCreditsService.getMovieCreditsShort(id);
  }
}