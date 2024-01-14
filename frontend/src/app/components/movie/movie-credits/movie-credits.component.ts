import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaCredits } from 'shared/models/media/media-credits';
import { MediaDetails } from 'shared/models/media/media-details';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.css']
})
export class MovieCreditsComponent {

  id!: string | null;
  movieDetailsData!: MediaDetails;
  movieCreditsData!: MediaCredits

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details, credits}) => {
      this.movieDetailsData = details;
      this.movieCreditsData = credits;
    })
  }
}
