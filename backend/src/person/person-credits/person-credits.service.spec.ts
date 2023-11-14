import { Test, TestingModule } from '@nestjs/testing';
import { PersonCreditsService } from './person-credits.service';

describe('PersonCreditsService', () => {
  let service: PersonCreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonCreditsService],
    }).compile();

    service = module.get<PersonCreditsService>(PersonCreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
