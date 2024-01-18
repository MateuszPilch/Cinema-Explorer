import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaReview } from 'shared/models/media/media-review';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {
  
  mediaReviewList: MediaReview[] = [];

  nickname: string = '';

  isLoading: boolean = false;

  mediaSortBy: string = 'Sortuj';
  sort_by: string = 'all';

  constructor(private route: ActivatedRoute, private userService: UserService) {}
  
  ngOnInit(): void {
    this.nickname = this.route.parent?.snapshot.paramMap.get('nickname')!;
    this.route.params.subscribe(() => {
      this.clearData();
    });
  }

  loadData(): void {
    if(!this.isLoading) {
      this.isLoading = true;
      this.userService.getFiltredMediaList(this.nickname, this.mediaReviewList.length, this.sort_by).subscribe((data) => {
        this.mediaReviewList = this.mediaReviewList.concat(data);
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
      });
    }
  }

  clearData(): void {
    this.mediaReviewList = [];
    this.loadData();
  }

  setSortBy(): void {
    this.sort_by = this.mediaSortBy;
    this.clearData();
  }
}
