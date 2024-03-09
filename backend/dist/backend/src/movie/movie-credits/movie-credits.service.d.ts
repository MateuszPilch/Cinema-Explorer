import { HttpService } from '@nestjs/axios';
import { MediaCredits } from 'shared/models/media/media-credits';
export declare class MovieCreditsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getMovieCredits(movie_id: string): Promise<MediaCredits>;
    getMovieCreditsShort(movie_id: string): Promise<MediaCredits>;
}
