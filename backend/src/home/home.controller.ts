import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { SearchData } from 'shared/models/search-data';

@Controller('home')
export class HomeController {

  constructor(private homeService: HomeService){}

  @Get('trending')
  getTrendingResults(@Query('time_window') time_window: string): Promise<SearchData> {
    return this.homeService.getTrendingResults(time_window);
  }
}
