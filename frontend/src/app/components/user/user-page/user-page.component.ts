import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  movies: number = 0;
  tv: number = 0;
  favourite: number = 0;
  to_watch: number = 0;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.nickname = this.route.snapshot.paramMap.get('nickname')!
      this.userService.getAvatar(this.nickname).subscribe(async (res) => {
        this.avatarPath = await imageToUrl(res);
      });
    });

    this.userService.getMediaListCount(this.nickname,'media_type','movie').subscribe(data => this.movies = data);
    this.userService.getMediaListCount(this.nickname,'media_type','tv').subscribe(data => this.tv = data);
    this.userService.getMediaListCount(this.nickname,'favourite','true').subscribe(data => this.favourite = data);
    this.userService.getMediaListCount(this.nickname,'to_watch','true').subscribe(data => this.to_watch = data);
  }

  setFilter(filterKey: string, filterValue: string): void {
    this.userService.setFilter(filterKey, filterValue);

  }

  getMediaCount(filterKey: string, filterValue: string): void {
    this.userService.getMediaListCount(this.nickname, filterKey, filterValue);
  }

  setAvatar(event: any): void {
    this.avatarFile = event.target.files[0];
    this.userService.setAvatar(this.avatarFile);
  }

  canEdit(): boolean {
    return this.authService.getNickname() == this.nickname;
  }
}
