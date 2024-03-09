import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { MapDetails } from 'shared/models/map/map-details';
import { Map } from 'src/schemas/map.schema';
export declare class MapPageService {
    private readonly httpService;
    private mapModel;
    constructor(httpService: HttpService, mapModel: Model<Map>);
    getLocationDetails(media_type: string, media_id: string, location_id: string): Promise<MapDetails>;
    getAllLocations(): Promise<MapAllLocations[]>;
    getRandomLocation(): Promise<MapDetails>;
}
