import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'shared/models/movie-details';
import { MovieCredits } from 'shared/models/movie-credits';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movie_id!: string | null;
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