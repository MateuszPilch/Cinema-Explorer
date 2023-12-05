import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieReview } from 'shared/models/movie/movie-review';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {
  movieReviewList!: MovieReview[]

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.userService.getMovieList().subscribe(res => {
      if(res) {
        this.movieReviewList = res;
        console.log("aaa");
      }
    });
  }
}
