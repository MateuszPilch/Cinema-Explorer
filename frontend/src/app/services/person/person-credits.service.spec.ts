import { TestBed } from '@angular/core/testing';

import { PersonCreditsService } from './person-credits.service';

describe('PersonCreditsService', () => {
  let service: PersonCreditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonCreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
