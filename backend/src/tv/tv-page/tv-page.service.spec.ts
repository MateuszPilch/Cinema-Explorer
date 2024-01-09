import { Test, TestingModule } from '@nestjs/testing';
import { TvPageService } from './tv-page.service';

describe('TvPageService', () => {
  let service: TvPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvPageService],
    }).compile();

    service = module.get<TvPageService>(TvPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
