import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCreditsComponent } from './tv-credits.component';

describe('TvCreditsComponent', () => {
  let component: TvCreditsComponent;
  let fixture: ComponentFixture<TvCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvCreditsComponent]
    });
    fixture = TestBed.createComponent(TvCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
