/// <reference types="multer" />
import { MapDetailsService } from './map-details/map-details.service';
import { MapAddService } from './map-add/map-add.service';
import { MapPageService } from './map-page/map-page.service';
import { MapDetails } from 'shared/models/map/map-details';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { MapDataDto } from './dto/map-data.dto';
export declare class MapController {
    private readonly mapPageService;
    private readonly mapDetailsService;
    private readonly mapAddService;
    constructor(mapPageService: MapPageService, mapDetailsService: MapDetailsService, mapAddService: MapAddService);
    getAllLocations(): Promise<MapAllLocations[]>;
    getRandomLocation(): Promise<MapDetails>;
    getMapDetails(media_type: string, media_id: string): Promise<MapDetails>;
    getLocationCount(media_type: string, media_id: string): Promise<number>;
    getLocationDetails(media_type: string, media_id: string, location_id: string): Promise<any>;
    addMapLocation(req: any, media_type: string, media_id: string, mapData: MapDataDto, image: Express.Multer.File): Promise<any>;
    deleteMapLocation(req: any, media_type: string, media_id: string, location_id: string): Promise<any>;
}
