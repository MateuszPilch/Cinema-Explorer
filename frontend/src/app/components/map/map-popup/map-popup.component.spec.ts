import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopupComponent } from './map-popup.component';

describe('MapPopupComponent', () => {
  let component: MapPopupComponent;
  let fixture: ComponentFixture<MapPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPopupComponent]
    });
    fixture = TestBed.createComponent(MapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
