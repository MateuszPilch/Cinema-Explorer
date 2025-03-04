import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaDetails } from '../../../shared/models/media/media-details';
import { MediaCredits } from '../../../shared/models/media/media-credits';
import { TvDetailsService } from './tv-details/tv-details.service';
import { TvCreditsService } from './tv-credits/tv-credits.service';
import { TvPageService } from './tv-page/tv-page.service';
import { MediaData } from '../../../shared/models/media/media-data';
import { TvGenres } from '../../../shared/models/tv/tv-genres';
import { TvSearchFilter } from '../../../shared/models/tv/tv-search-filter';
import { MediaImages } from '../../../shared/models/media/media-images';

@Controller('tv')
export class TvController {
  constructor(
    private readonly tvPageService: TvPageService,
    private readonly tvDetailsService: TvDetailsService, 
    private readonly tvCreditsService: TvCreditsService
  ){}

  @Get()
  getMovieData(@Query() params: TvSearchFilter): Promise<MediaData> {
    return this.tvPageService.getTvData(params);
  }

  @Get('genres')
  getMovieGenres(): Promise<TvGenres> {
    return this.tvPageService.GetTvGenres();
  }

  @Get(':id')
  getTvDetails(@Param('id') id: string): Promise<MediaDetails> {
    return this.tvDetailsService.getTvDetails(id);
  }

  @Get(':id/images')
  getMovieImages(@Param('id') id: string): Promise<MediaImages> {
    return this.tvDetailsService.getTvImages(id);
  }

  @Get(':id/credits')
  getTvCredits(@Param('id') id: string): Promise<MediaCredits> {
    return this.tvCreditsService.getTvCredits(id);
  }

  @Get(':id/credits_short')
  getTvCreditsShort(@Param('id') id: string): Promise<MediaCredits> {
    return this.tvCreditsService.getTvCreditsShort(id);
  }
}