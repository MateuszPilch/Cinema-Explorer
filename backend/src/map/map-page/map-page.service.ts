import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { MapAllLocations } from 'shared/models/map/map-all-locations';
import { MapDetails } from 'shared/models/map/map-details';
import { Maps } from 'src/schemas/maps.schema';

@Injectable()
export class MapPageService { 

  constructor(private readonly httpService: HttpService,
    @InjectModel(Maps.name) private mapsModel: Model<Maps>) {}

  async getLocationDetails(media_type: string, media_id: string, location_id: string): Promise<MapDetails> {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const details = (await this.mapsModel.findOne({media_type, media_id}));
    const mapData = details ? [details.map_data.find(location => location._id == location_id)] : null;
    const res = plainToClass(MapDetails, {...data, mapData}, { excludeExtraneousValues: false });

    return res;
  }

  async getAllLocations(): Promise<MapAllLocations[]> {

    const details = (await this.mapsModel.find({}, 'media_type media_id map_data._id map_data.center').lean());
    const res = plainToClass(MapAllLocations, details, { excludeExtraneousValues: false });
    return res;
  }
}
