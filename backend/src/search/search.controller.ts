import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchData } from 'shared/models/search-data';

@Controller('search')
export class SearchController {

  constructor(private readonly searchService: SearchService) {}

  @Get()
  getSearchResults(@Query('query') query: string, @Query('page') page: string): Promise<SearchData> {
    return this.searchService.getSearchResults(query, page);
  }
}
