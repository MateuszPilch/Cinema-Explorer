import { TestBed } from '@angular/core/testing';

import { TvCreditsService } from './tv-credits.service';

describe('TvCreditsService', () => {
  let service: TvCreditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvCreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
