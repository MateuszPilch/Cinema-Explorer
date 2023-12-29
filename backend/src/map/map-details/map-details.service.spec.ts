import { Test, TestingModule } from '@nestjs/testing';
import { MapDetailsService } from './map-details.service';

describe('MapDetailsService', () => {
  let service: MapDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapDetailsService],
    }).compile();

    service = module.get<MapDetailsService>(MapDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
