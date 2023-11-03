import { Test, TestingModule } from '@nestjs/testing';
import { TvCreditsService } from './tv-credits.service';

describe('TvCreditsService', () => {
  let service: TvCreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvCreditsService],
    }).compile();

    service = module.get<TvCreditsService>(TvCreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
