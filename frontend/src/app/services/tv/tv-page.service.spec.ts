import { TestBed } from '@angular/core/testing';

import { TvPageService } from './tv-page.service';

describe('TvPageService', () => {
  let service: TvPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
