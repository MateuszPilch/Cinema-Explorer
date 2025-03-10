import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { MapDetails } from '../../../../shared/models/map/map-details';
import { Map } from '../../schemas/map.schema';

@Injectable()
export class MapDetailsService { 
  constructor(private readonly httpService: HttpService,
    @InjectModel(Map.name) private mapModel: Model<Map>) {}

  async getMediaDetails(media_type: string, media_id: string): Promise<MapDetails> {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url, headers))
    const details = (await this.mapModel.findOne({media_type, media_id}));
    const mapData = details ? details.map_data : null;
    const res = plainToInstance(MapDetails, {...data, mapData}, { excludeExtraneousValues: false });
    return res;
  }

  async getLocationCount(media_type: string, media_id: string): Promise<number> {
    const res = await this.mapModel.findOne({media_type, media_id});
    return (res?.map_data?.length ?? 0);
  }

  async deleteMapLocation(user_id: string, media_type: string, media_id: string, location_id : string): Promise<any> {
    return await this.mapModel.updateOne({media_type, media_id}, { $pull: { map_data: {_id: location_id, user_id: user_id.toString()}}});
  }
}