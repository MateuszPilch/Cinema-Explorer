import { HomeService } from './home.service';
import { SearchData } from 'shared/models/search-data';
export declare class HomeController {
    private homeService;
    constructor(homeService: HomeService);
    getTrendingResults(time_window: string): Promise<SearchData>;
}
