import { Test, TestingModule } from '@nestjs/testing';
import { MapLocationService } from './map-location.service';

describe('MapLocationService', () => {
  let service: MapLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapLocationService],
    }).compile();

    service = module.get<MapLocationService>(MapLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
