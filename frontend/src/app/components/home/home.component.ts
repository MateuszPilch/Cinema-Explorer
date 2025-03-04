import { Component, ViewChild } from '@angular/core';
import { SearchData } from '../../../shared/models/search-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeService } from 'src/app/services/home/home.service';
import { MapMiniComponent } from '../map/map-mini/map-mini.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(MapMiniComponent)
  mapMiniComponent!: MapMiniComponent;

  nickname!: string;
  trendingData!: SearchData;

  constructor(private authService: AuthService, private homeService: HomeService) {}

  ngOnInit(): void {
    this.nickname = this.authService.getNickname();
    this.getTrending('day');
  }

  getTrending(time_window: string) {
    this.homeService.getTrendingResults(time_window).subscribe((data) => {
      this.trendingData = data;
    });
  }

  getRandomLocation(): void {
    this.mapMiniComponent.getRandomLocation();
  }
}
