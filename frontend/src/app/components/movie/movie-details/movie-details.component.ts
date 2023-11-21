import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieCredits } from 'shared/models/movie/movie-credits';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  id!: string | null;
  movieDetailsData!: MovieDetails;
  movieCreditsData!: MovieCredits

  constructor(private route: ActivatedRoute,public authService: AuthService) {}

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