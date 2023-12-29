import { Test, TestingModule } from '@nestjs/testing';
import { MapPageService } from './map-page.service';

describe('MapPageService', () => {
  let service: MapPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapPageService],
    }).compile();

    service = module.get<MapPageService>(MapPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
