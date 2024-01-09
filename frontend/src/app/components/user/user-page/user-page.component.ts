import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { imageToUrl } from 'shared/image-to-url';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  private avatarFile!: File;

  nickname!: string;
  avatarPath!: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.nickname = this.route.snapshot.paramMap.get('nickname')!
      this.userService.getAvatar(this.nickname).subscribe(async (res) => {
        this.avatarPath = await imageToUrl(res);
      });
      this.userService.getMediaList(this.nickname);
    });
  }

  movieListFilter(): void {
    this.userService.clearFilter();
    this.userService.setFilter('media_type', 'movie');
    this.userService.setMediaListFilter();
  }

  tvListFilter(): void {
    this.userService.clearFilter();
    this.userService.setFilter('media_type', 'tv');
    this.userService.setMediaListFilter();
  }

  favouritveListFilter(): void {
    this.userService.clearFilter();
    this.userService.setFilter('favourite', true);
    this.userService.setMediaListFilter();
  }

  toWatchListFilter(): void {
    this.userService.clearFilter();
    this.userService.setFilter('to_watch', true);
    this.userService.setMediaListFilter();
  }

  
  getMediaListCount(media_type: string): number {
    return this.userService.mediaReviewList.filter(x => x.media_type === media_type).length;
  }

  getFavouriteListCount(): number {
    return this.userService.mediaReviewList.filter(x => x.favourite).length;
  }

  getToWatchListCount(): number {
    return this.userService.mediaReviewList.filter(x => x.to_watch).length;
  }

  setAvatar(event: any): void {
    this.avatarFile = event.target.files[0];
    this.userService.setAvatar(this.avatarFile);
  }

  canEdit(): boolean {
    return this.authService.getNickname() == this.nickname;
  }
}
