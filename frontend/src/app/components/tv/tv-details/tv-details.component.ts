import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent {

  id!: string | null;
  tvDetailsData!: MediaDetails;
  tvCreditsData!: MediaCredits;

  tvRating: number = 0;
  tvReview: string = '';
  tvFavourite: boolean = false;
  tvToWatch: boolean = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.tvDetailsData = details;
      this.tvDetailsData.vote_average = Math.round(this.tvDetailsData.vote_average / 2 * 10) / 10;

      this.userService.getMediaReview(this.tvDetailsData.id, "tv").subscribe(res => {
        if(res) {
          this.tvRating = res.rating,
          this.tvReview = res.review;
          this.tvFavourite = res.favourite;
          this.tvToWatch = res.to_watch;
        }
      });
    });
    this.route.data.subscribe(({credits}) => {
      this.tvCreditsData = credits;
    })
  }

  setTvReview(): void {
    this.userService.setMediaReview(this.tvDetailsData.id, "tv", this.tvDetailsData.name, this.tvDetailsData.poster_path, this.tvRating, this.tvReview, this.tvFavourite, this.tvToWatch);
  }

  setTvRating(rating: number): void {
    if(this.tvRating != rating) {
      this.tvRating = rating;
    }
    else{
      this.tvRating = 0;
    }
    this.setTvReview();
  }

  setTvFavourite(): void {
    this.tvFavourite = !this.tvFavourite;
    this.setTvReview();
  }

  setTvToWatch(): void {
    this.tvToWatch = !this.tvToWatch;
    this.setTvReview();
  }
}
