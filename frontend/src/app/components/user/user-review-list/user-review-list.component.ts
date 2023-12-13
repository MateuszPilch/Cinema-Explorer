import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {
  isFilterOpen: boolean = false;
  constructor(public userService: UserService) {}
  
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
