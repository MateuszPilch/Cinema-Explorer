import { HttpService } from '@nestjs/axios';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaImages } from 'shared/models/media/media-images';
export declare class MovieDetailsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getMovieDetails(movie_id: string): Promise<MediaDetails>;
    getMovieImages(movie_id: string): Promise<MediaImages>;
}
