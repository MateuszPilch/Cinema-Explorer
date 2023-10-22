import { Test, TestingModule } from '@nestjs/testing';
import { MovieCreditsService } from './movie-credits.service';

describe('MovieCreditsService', () => {
  let service: MovieCreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieCreditsService],
    }).compile();

    service = module.get<MovieCreditsService>(MovieCreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
