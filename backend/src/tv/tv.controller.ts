import { Controller, Get, Param } from '@nestjs/common';
import { TvDetails } from 'shared/models/tv/tv-details';
import { TvDetailsService } from './tv-details/tv-details.service';
import { TvCredits } from 'shared/models/tv/tv-credits';
import { TvCreditsService } from './tv-credits/tv-credits.service';

@Controller('tv')
export class TvController {
  constructor(private readonly tvDetailsService: TvDetailsService, private readonly tvCreditsService: TvCreditsService) {}

  @Get(':id')
  getTvDetails(@Param('id') param: string): Promise<TvDetails> {
    return this.tvDetailsService.getTvDetails(param);
  }
  @Get(':id/credits')
  getTvCredits(@Param('id') param: string): Promise<TvCredits> {
    return this.tvCreditsService.getTvCredits(param);
  }

  @Get(':id/credits_short')
  getTvCreditsShort(@Param('id') param: string): Promise<TvCredits> {
    return this.tvCreditsService.getTvCreditsShort(param);
  }
}