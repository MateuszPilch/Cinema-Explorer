import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapPageService } from './map-page/map-page.service';
import { MapDetailsService } from './map-details/map-details.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Map, MapSchema } from 'src/schemas/map.schema';
import { MapAddService } from './map-add/map-add.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{name: Map.name, schema: MapSchema}])],
  controllers: [MapController],
  providers: [MapPageService, MapDetailsService, MapAddService],
})
export class MapModule {}
