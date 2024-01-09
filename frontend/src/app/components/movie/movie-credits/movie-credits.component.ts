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
    this.route.data.subscribe(({details}) => {
      this.movieDetailsData = details;
      this.movieDetailsData.vote_average = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;
    })

    this.route.data.subscribe(({credits}) => {
      this.movieCreditsData = credits;
    })
  }
}
