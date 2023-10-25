import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreditsComponent } from './movie-credits.component';

describe('MovieCreditsComponent', () => {
  let component: MovieCreditsComponent;
  let fixture: ComponentFixture<MovieCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCreditsComponent]
    });
    fixture = TestBed.createComponent(MovieCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
