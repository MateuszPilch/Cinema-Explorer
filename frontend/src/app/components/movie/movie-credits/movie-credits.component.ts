import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCredits } from 'shared/models/movie-credits';
import { MovieDetails } from 'shared/models/movie-details';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.css']
})
export class MovieCreditsComponent {

  id!: string | null;
  movieDetailsData!: MovieDetails;
  movieCreditsData!: MovieCredits

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
