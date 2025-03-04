import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { MapAllLocations } from '../../../../shared/models/map/map-all-locations';
import { MapDetails } from '../../../../shared/models/map/map-details';
import { Map } from 'src/schemas/map.schema';

@Injectable()
export class MapPageService { 

  constructor(private readonly httpService: HttpService,
    @InjectModel(Map.name) private mapModel: Model<Map>) {}

  async getLocationDetails(media_type: string, media_id: string, location_id: string): Promise<MapDetails> {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const details = (await this.mapModel.findOne({media_type, media_id}));
    const mapData = details ? [details.map_data.find(location => location._id == location_id)] : null;
    const res = plainToInstance(MapDetails, {...data, mapData}, { excludeExtraneousValues: false });
    return res;
  }

  async getAllLocations(): Promise<MapAllLocations[]> {
    const details = (await this.mapModel.find({}, 'media_type media_id map_data._id map_data.center').lean());
    const res = plainToInstance(MapAllLocations, details, { excludeExtraneousValues: true });
    return res;
  }

  async getRandomLocation(): Promise<MapDetails> {
    const details = await this.mapModel.aggregate([{ $match: { 'map_data.0': { $exists: true } } },{ $sample: { size: 1 } },]);
    const randomMap = details.length > 0 ? details[0] : null;

    if(randomMap) {
      const mapData = randomMap.map_data;
      const url = `https://api.themoviedb.org/3/${randomMap.media_type}/${randomMap.media_id}?language=pl-PL`;
      const headers = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_CRED}`
        }
      };
      const { data } = await firstValueFrom(this.httpService.get(url, headers))
      
      const res = plainToInstance(MapDetails, {...data, mapData}, { excludeExtraneousValues: false });
      return res;
    } else {
      return new MapDetails();
    }
  }
}
