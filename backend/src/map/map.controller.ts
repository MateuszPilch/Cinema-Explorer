import { Controller, Get, Param } from '@nestjs/common';
import { MapDetails } from 'shared/models/map/map-details';
import { MapDetailsService } from './map-details/map-details.service';

@Controller('map')
export class MapController {

  constructor(private readonly mapDetailsService: MapDetailsService) {}
  
  @Get(':media_type/:media_id/details')
  getMapDetails(@Param('media_type') media_type: string, @Param('media_id') media_id: string): Promise<MapDetails> {
    return this.mapDetailsService.getMediaDetails(media_type, media_id);
  }
}
