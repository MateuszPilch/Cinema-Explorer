import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Map } from '../../schemas/map.schema';
import { MapDataDto } from '../dto/map-data.dto';

@Injectable()
export class MapAddService {

  constructor(@InjectModel(Map.name) private mapModel: Model<Map>) {}
  
  async addMediaLocation(user_id: string, media_type: string, media_id: string, mapData: MapDataDto, image: Express.Multer.File): Promise<any> {
    const media = await this.mapModel.findOne({media_type, media_id})
    const coords = mapData.center.toString().split(',').map(coord => Number(coord));
    if(media) {
      media.map_data.push({
        _id: new mongoose.mongo.ObjectId().toString(),
        user_id: user_id.toString(),
        name: mapData.name,
        runtime: mapData.runtime, 
        episode: mapData.episode,
        description: mapData.description,
        center: coords,
        radius: Number(mapData.radius),
        image: image});
      media.markModified('map_data');
      await media.save();
    } else {
      await this.mapModel.create({
        media_type,
        media_id,
        map_data: {
          _id: new mongoose.mongo.ObjectId().toString(),
          user_id: user_id.toString(),
          name: mapData.name,
          runtime: mapData.runtime, 
          episode: mapData.episode,
          description: mapData.description,
          center: coords,
          radius: Number(mapData.radius),
          image: image
        },
      });
    }
  }
}