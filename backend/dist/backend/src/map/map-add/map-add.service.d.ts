/// <reference types="multer" />
import { Model } from 'mongoose';
import { Map } from 'src/schemas/map.schema';
import { MapDataDto } from '../dto/map-data.dto';
export declare class MapAddService {
    private mapModel;
    constructor(mapModel: Model<Map>);
    addMediaLocation(user_id: string, media_type: string, media_id: string, mapData: MapDataDto, image: Express.Multer.File): Promise<any>;
}
