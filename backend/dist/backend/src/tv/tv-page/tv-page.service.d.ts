import { HttpService } from '@nestjs/axios';
import { MediaData } from 'shared/models/media/media-data';
import { TvSearchFilter } from 'shared/models/tv/tv-search-filter';
import { TvGenres } from 'shared/models/tv/tv-genres';
export declare class TvPageService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getTvData(params: TvSearchFilter): Promise<MediaData>;
    GetTvGenres(): Promise<TvGenres>;
}
