import { TestBed } from '@angular/core/testing';

import { MoviePageService } from './movie-page.service';

describe('MoviePageService', () => {
  let service: MoviePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
