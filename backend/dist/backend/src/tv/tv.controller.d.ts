import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { TvDetailsService } from './tv-details/tv-details.service';
import { TvCreditsService } from './tv-credits/tv-credits.service';
import { TvPageService } from './tv-page/tv-page.service';
import { MediaData } from 'shared/models/media/media-data';
import { TvGenres } from 'shared/models/tv/tv-genres';
import { TvSearchFilter } from 'shared/models/tv/tv-search-filter';
import { MediaImages } from 'shared/models/media/media-images';
export declare class TvController {
    private readonly tvPageService;
    private readonly tvDetailsService;
    private readonly tvCreditsService;
    constructor(tvPageService: TvPageService, tvDetailsService: TvDetailsService, tvCreditsService: TvCreditsService);
    getMovieData(params: TvSearchFilter): Promise<MediaData>;
    getMovieGenres(): Promise<TvGenres>;
    getTvDetails(id: string): Promise<MediaDetails>;
    getMovieImages(id: string): Promise<MediaImages>;
    getTvCredits(id: string): Promise<MediaCredits>;
    getTvCreditsShort(id: string): Promise<MediaCredits>;
}
