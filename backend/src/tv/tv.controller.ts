import { Controller, Get, Param, Query } from '@nestjs/common';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { TvDetailsService } from './tv-details/tv-details.service';
import { TvCreditsService } from './tv-credits/tv-credits.service';
import { TvPageService } from './tv-page/tv-page.service';
import { MediaData } from 'shared/models/media/media-data';
import { MediaSearchFilter } from 'shared/models/media/media-search-filter';

@Controller('tv')
export class TvController {
  constructor(
    private readonly tvPageService: TvPageService,
    private readonly tvDetailsService: TvDetailsService, 
    private readonly tvCreditsService: TvCreditsService
  ){}

  @Get()
  getMovieData(@Query() params: MediaSearchFilter): Promise<MediaData> {
    return this.tvPageService.getTvData(params);
  }

  @Get(':id')
  getTvDetails(@Param('id') param: string): Promise<MediaDetails> {
    return this.tvDetailsService.getTvDetails(param);
  }
  @Get(':id/credits')
  getTvCredits(@Param('id') param: string): Promise<MediaCredits> {
    return this.tvCreditsService.getTvCredits(param);
  }

  @Get(':id/credits_short')
  getTvCreditsShort(@Param('id') param: string): Promise<MediaCredits> {
    return this.tvCreditsService.getTvCreditsShort(param);
  }
}