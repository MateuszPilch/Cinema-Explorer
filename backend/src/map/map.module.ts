import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapPageService } from './map-page/map-page.service';
import { MapDetailsService } from './map-details/map-details.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Maps, MapsSchema } from 'src/schemas/maps.schema';
import { MapAddService } from './map-add/map-add.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{name: Maps.name, schema: MapsSchema}])],
  controllers: [MapController],
  providers: [MapPageService, MapDetailsService, MapAddService],
})
export class MapModule {}
