import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { MapDetails } from 'shared/models/map/map-details';
import { Map } from 'src/schemas/map.schema';
export declare class MapDetailsService {
    private readonly httpService;
    private mapModel;
    constructor(httpService: HttpService, mapModel: Model<Map>);
    getMediaDetails(media_type: string, media_id: string): Promise<MapDetails>;
    getLocationCount(media_type: string, media_id: string): Promise<number>;
    deleteMapLocation(user_id: string, media_type: string, media_id: string, location_id: string): Promise<any>;
}
