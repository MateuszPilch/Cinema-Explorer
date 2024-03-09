import { HttpService } from '@nestjs/axios';
import { SearchData } from 'shared/models/search-data';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class SearchService {
    private readonly httpService;
    private userModel;
    constructor(httpService: HttpService, userModel: Model<User>);
    getSearchResults(type: string, query: string, page: string): Promise<SearchData>;
}
