import { SearchService } from './search.service';
import { SearchData } from 'shared/models/search-data';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    getSearchResults(type: string, query: string, page: string): Promise<SearchData>;
}
