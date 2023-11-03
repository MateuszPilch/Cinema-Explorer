import { TestBed } from '@angular/core/testing';

import { TvDetailsService } from './tv-details.service';

describe('TvDetailsService', () => {
  let service: TvDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
