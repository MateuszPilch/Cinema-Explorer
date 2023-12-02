import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieCredits } from 'shared/models/movie/movie-credits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieDetailsService } from 'src/app/services/movie/movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movieDetailsData!: MovieDetails;
  movieCreditsData!: MovieCredits

  movieRating: number = 0;
  movieReview: string = '';

  constructor(private route: ActivatedRoute, public authService: AuthService, private movieDetailsService: MovieDetailsService) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.movieDetailsData = details;
      this.movieDetailsData.vote_average = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;

      const a = this.movieDetailsService.getMovieReview(this.movieDetailsData.id);
    })

    this.route.data.subscribe(({credits}) => {
      this.movieCreditsData = credits;
    })
  }

  getMovieReview(): void {
    this.movieDetailsService.getMovieReview(this.movieDetailsData.id);
  }

  setMovieReview(rating: number): void {
    this.movieRating = rating;
  }

  addMovieReview(): void {
    if(this.movieRating > 0) {
      this.movieDetailsService.addMovieReview(this.movieDetailsData.id, this.movieRating, this.movieReview);
    }
  }
}