import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from '../../../../../../shared/models/media/media-details';
import { MediaImages } from '../../../../../../shared/models/media/media-images';
import { MediaCredits } from '../../../../../../shared/models/media/media-credits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movieDetailsData!: MediaDetails;
  movieImagesData!: MediaImages;
  movieCreditsData!: MediaCredits
  movieLocationCount: number = 0;

  movieRating: number = 0;
  movieReview: string = '';
  movieFavourite: boolean = false;
  movieToWatch: boolean = false;

  isLightboxEnabled: boolean = false;
  lightboxIndex!: number;
  lightboxImage!: string;

  constructor(private route: ActivatedRoute, public authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.route.data.subscribe(({details, images, credits, locationCount}) => {
      this.movieDetailsData = details;
      this.movieImagesData = images;
      this.movieCreditsData = credits;
      this.movieLocationCount = locationCount;

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

  lightboxControl(status: boolean, index: number): void {
    this.isLightboxEnabled = status;
    this.lightboxIndex = index;
    this.lightboxImage = this.movieImagesData.backdrops[this.lightboxIndex].file_path;
  }

  lightboxChangeImage(index: number): void {
    this.lightboxIndex += index;
    this.lightboxIndex = this.lightboxIndex < 0 ? this.movieImagesData.backdrops.length - 1: 
    this.lightboxIndex >= this.movieImagesData.backdrops.length ? 0 : this.lightboxIndex;
    this.lightboxImage = this.movieImagesData.backdrops[this.lightboxIndex].file_path;
  }
}