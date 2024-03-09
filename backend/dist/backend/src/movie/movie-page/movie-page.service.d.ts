import { HttpService } from '@nestjs/axios';
import { MovieSearchFilter } from 'shared/models/movie/movie-search-filter';
import { MediaData } from 'shared/models/media/media-data';
import { MovieGenres } from 'shared/models/movie/movie-genres';
export declare class MoviePageService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getMovieData(params: MovieSearchFilter): Promise<MediaData>;
    GetMovieGenres(): Promise<MovieGenres>;
}
