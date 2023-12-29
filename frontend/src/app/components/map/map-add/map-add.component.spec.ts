import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAddComponent } from './map-add.component';

describe('MapAddComponent', () => {
  let component: MapAddComponent;
  let fixture: ComponentFixture<MapAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapAddComponent]
    });
    fixture = TestBed.createComponent(MapAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
