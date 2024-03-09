import { HttpService } from '@nestjs/axios';
import { MediaCredits } from 'shared/models/media/media-credits';
export declare class TvCreditsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getTvCredits(id: string): Promise<MediaCredits>;
    getTvCreditsShort(id: string): Promise<MediaCredits>;
}
