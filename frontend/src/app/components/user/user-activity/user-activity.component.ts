import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaReview } from '../../../shared/models/media/media-review';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent {
  
  mediaReviewList: MediaReview[] = [];

  nickname: string = '';
  
  isLoading: boolean = false;
  isFilterOpen: boolean = false;
  
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.nickname = this.route.parent?.snapshot.paramMap.get('nickname')!;
    this.loadData();
  }

  loadData(): void {
    if(!this.isLoading) {
      this.isLoading = true;
      this.userService.getAllMediaList(this.nickname, this.mediaReviewList.length).subscribe((data) => {
        this.mediaReviewList = this.mediaReviewList.concat(data);
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
      });
    }
  }
}
