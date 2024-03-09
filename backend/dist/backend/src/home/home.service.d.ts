import { HttpService } from '@nestjs/axios';
import { SearchData } from 'shared/models/search-data';
export declare class HomeService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getTrendingResults(time_window: string): Promise<SearchData>;
}
