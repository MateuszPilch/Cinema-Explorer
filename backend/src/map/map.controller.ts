import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MapDetailsService } from './map-details/map-details.service';
import { MapAddService } from './map-add/map-add.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MapPageService } from './map-page/map-page.service';
import { MapDetails } from '../../../shared/models/map/map-details';
import { MapAllLocations } from '../../../shared/models/map/map-all-locations';
import { MapDataDto } from './dto/map-data.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('map')
export class MapController {

  constructor(
    private readonly mapPageService: MapPageService, 
    private readonly mapDetailsService: MapDetailsService, 
    private readonly mapAddService: MapAddService
  ) {}

  @Get('/all')
  getAllLocations(): Promise<MapAllLocations[]> {
    return this.mapPageService.getAllLocations();
  }

  @Get('/random')
  getRandomLocation(): Promise<MapDetails> {
    return this.mapPageService.getRandomLocation();
  }

  @Get(':media_type/:media_id/details')
  getMapDetails(@Param('media_type') media_type: string, @Param('media_id') media_id: string): Promise<MapDetails> {
    return this.mapDetailsService.getMediaDetails(media_type, media_id);
  }

  @Get(':media_type/:media_id/count')
  getLocationCount(@Param('media_type') media_type: string, @Param('media_id') media_id: string): Promise<number> {
    return this.mapDetailsService.getLocationCount(media_type, media_id);
  }

  @Get(':media_type/:media_id/:location_id')
  getLocationDetails(@Param('media_type') media_type: string, @Param('media_id') media_id: string, @Param('location_id') location_id: string): Promise<any> {
    return this.mapPageService.getLocationDetails(media_type, media_id, location_id);
  }
  
  @Post(':media_type/:media_id/add')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  addMapLocation(@Req() req, @Param('media_type') media_type: string, @Param('media_id') media_id: string, @Body() mapData: MapDataDto, @UploadedFile() image: Express.Multer.File): Promise<any> {
    return this.mapAddService.addMediaLocation(req.user._id, media_type, media_id, mapData, image);
  }

  @Post(':media_type/:media_id/:location_id/delete')
  @UseGuards(AuthGuard('jwt'))
  deleteMapLocation(@Req() req, @Param('media_type') media_type: string, @Param('media_id') media_id: string, @Param('location_id') location_id: string): Promise<any> {
    return this.mapDetailsService.deleteMapLocation(req.user._id, media_type, media_id, location_id);
  }
}
