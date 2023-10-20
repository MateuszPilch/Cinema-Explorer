import { TestBed } from '@angular/core/testing';

import { MovieCreditsService } from './movie-credits.service';

describe('MovieCreditsService', () => {
  let service: MovieCreditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
