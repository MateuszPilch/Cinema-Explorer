import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movieDetailsData!: MediaDetails;
  movieCreditsData!: MediaCredits

  movieRating: number = 0;
  movieReview: string = '';
  movieFavourite: boolean = false;
  movieToWatch: boolean = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.movieDetailsData = details;
      this.movieDetailsData.vote_average = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;

      this.userService.getMediaReview(this.movieDetailsData.id, "movie").subscribe(res => {
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
    this.userService.setMediaReview(this.movieDetailsData.id, "movie", this.movieDetailsData.title, this.movieDetailsData.poster_path, this.movieRating, this.movieReview, this.movieFavourite, this.movieToWatch);
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