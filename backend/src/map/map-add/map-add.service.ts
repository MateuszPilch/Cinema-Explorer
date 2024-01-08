import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MapData } from 'shared/models/map/map-data';
import { Maps } from 'src/schemas/maps.schema';

@Injectable()
export class MapAddService {

  constructor(@InjectModel(Maps.name) private mapsModel: Model<Maps>) {}
  
  async addMediaLocation(media_type: string, media_id: string, mapData: MapData, image: Express.Multer.File): Promise<any> {
    const media = await this.mapsModel.findOne({media_type, media_id})
    const coords = mapData.center.toString().split(',').map(coord => Number(coord));
    if(media) {
      media.map_data.push({
        _id: new mongoose.mongo.ObjectId().toString(),
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
      await this.mapsModel.create({
        media_type,
        media_id,
        map_data: {
          _id: new mongoose.mongo.ObjectId().toString(),
          name: mapData.name,
          runtime: mapData.runtime, 
          episode: mapData.episode,
          description: mapData.description,
          center: coords,
          radius: Number(mapData.radius),
          image: image
        },
        visible: true,
      });
    }
  }
}