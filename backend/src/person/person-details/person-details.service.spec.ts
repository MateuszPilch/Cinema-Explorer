import { Test, TestingModule } from '@nestjs/testing';
import { PersonDetailsService } from './person-details.service';

describe('PersonDetailsService', () => {
  let service: PersonDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonDetailsService],
    }).compile();

    service = module.get<PersonDetailsService>(PersonDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
