import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { MapDetails } from 'shared/models/map/map-details';
import { Maps } from 'src/schemas/maps.schema';

@Injectable()
export class MapDetailsService { 
  constructor(private readonly httpService: HttpService,
    @InjectModel(Maps.name) private mapsModel: Model<Maps>) {}

  async getMediaDetails(media_type: string, media_id: string): Promise<MapDetails> {
    const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=pl-PL`;
    const headers = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_CRED}`
      }
    };
    const { data } = await firstValueFrom(this.httpService.get(url,headers))
    const details = (await this.mapsModel.findOne({media_type, media_id}));
    const mapData = details ? details.map_data : null;
    const res = plainToClass(MapDetails, {...data, mapData}, { excludeExtraneousValues: false });

    return res;
  }
}