import { TestBed } from '@angular/core/testing';

import { MapMiniService } from './map-mini.service';

describe('MapMiniService', () => {
  let service: MapMiniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMiniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
