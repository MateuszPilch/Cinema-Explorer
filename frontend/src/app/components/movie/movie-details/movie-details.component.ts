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
  movieFavourite: boolean = false;
  movieToWatch: boolean = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private movieDetailsService: MovieDetailsService) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.movieDetailsData = details;
      this.movieDetailsData.vote_average = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;

      this.movieDetailsService.getMovieReview(this.movieDetailsData.id).subscribe(res => {
        if(res) {
          this.movieRating = res.rating,
          this.movieReview = res.review;
          this.movieFavourite = res.favourite;
          this.movieToWatch = res.to_watch;
        }
      });
    });
    this.route.data.subscribe(({credits}) => {
      this.movieCreditsData = credits;
    })
  }

  setMovieReview(): void {
    this.movieDetailsService.setMovieReview(this.movieDetailsData.id, this.movieRating, this.movieReview, this.movieFavourite, this.movieToWatch);
  }

  setMovieRating(rating: number): void {
    if(this.movieRating != rating) {
      this.movieRating = rating;
    }
    else{
      this.movieRating = 0;
    }
    this.setMovieReview();
  }

  setMovieFavourite(): void {
    this.movieFavourite = !this.movieFavourite;
    this.setMovieReview();
  }

  setMovieToWatch(): void {
    this.movieToWatch = !this.movieToWatch;
    this.setMovieReview();
  }
}