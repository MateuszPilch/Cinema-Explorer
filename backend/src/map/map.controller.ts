import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MapDetails } from 'shared/models/map/map-details';
import { MapDetailsService } from './map-details/map-details.service';
import { MapAddService } from './map-add/map-add.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('map')
export class MapController {

  constructor(private readonly mapDetailsService: MapDetailsService, private readonly mapAddService: MapAddService) {}
  
  @Get(':media_type/:media_id/details')
  getMapDetails(@Param('media_type') media_type: string, @Param('media_id') media_id: string): Promise<MapDetails> {
    return this.mapDetailsService.getMediaDetails(media_type, media_id);
  }

  @Post(':media_type/:media_id/add')
  @UseInterceptors(FileInterceptor('image'))
  addMapLocation(@Param('media_type') media_type: string, @Param('media_id') media_id: string, @Body() mapData: any, @UploadedFile() image: Express.Multer.File): Promise<any> {
    return this.mapAddService.addMediaLocation(media_type, media_id, mapData, image);
  }
}
