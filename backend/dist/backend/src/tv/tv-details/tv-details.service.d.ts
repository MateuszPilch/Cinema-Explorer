import { HttpService } from '@nestjs/axios';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaImages } from 'shared/models/media/media-images';
export declare class TvDetailsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getTvDetails(id: string): Promise<MediaDetails>;
    getTvImages(tv_id: string): Promise<MediaImages>;
}
