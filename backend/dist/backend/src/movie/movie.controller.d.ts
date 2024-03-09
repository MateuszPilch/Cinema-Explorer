import { MovieDetailsService } from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MediaData } from 'shared/models/media/media-data';
import { MovieSearchFilter } from 'shared/models/movie/movie-search-filter';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { MoviePageService } from './movie-page/movie-page.service';
import { MediaImages } from 'shared/models/media/media-images';
import { MovieGenres } from 'shared/models/movie/movie-genres';
export declare class MovieController {
    private readonly moviePageService;
    private readonly movieDetailsService;
    private readonly movieCreditsService;
    constructor(moviePageService: MoviePageService, movieDetailsService: MovieDetailsService, movieCreditsService: MovieCreditsService);
    getMovieData(params: MovieSearchFilter): Promise<MediaData>;
    getMovieGenres(): Promise<MovieGenres>;
    getMovieDetails(id: string): Promise<MediaDetails>;
    getMovieImages(id: string): Promise<MediaImages>;
    getMovieCredits(id: string): Promise<MediaCredits>;
    getMovieCreditsShort(id: string): Promise<MediaCredits>;
}
