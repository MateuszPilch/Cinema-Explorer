import { Test, TestingModule } from '@nestjs/testing';
import { MapAddService } from './map-add.service';

describe('MapAddService', () => {
  let service: MapAddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapAddService],
    }).compile();

    service = module.get<MapAddService>(MapAddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
