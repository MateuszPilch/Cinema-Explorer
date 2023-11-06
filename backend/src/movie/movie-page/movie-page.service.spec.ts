import { Test, TestingModule } from '@nestjs/testing';
import { MoviePageService } from './movie-page.service';

describe('MoviePageService', () => {
  let service: MoviePageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviePageService],
    }).compile();

    service = module.get<MoviePageService>(MoviePageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
