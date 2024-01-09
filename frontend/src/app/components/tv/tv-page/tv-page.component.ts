import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'ngx-slider-v2';
import { MediaData } from 'shared/models/media/media-data';
import { TvPageService } from 'src/app/services/tv/tv-page.service';

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.css']
})
export class TvPageComponent {
  isFilterOpen: boolean = false;

  tvData!: MediaData;
  tvPagination!: number[];
  
  voteAvgRange: number[] = [1,5];
  voteAvgOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true,
    getSelectionBarColor: (): string => {
      return '#5eead4';
    },
    getPointerColor: (): string => {
      return '#5eead4';
    }
  };

  voteCountRange: number = 0;
  voteCountOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 100,
    showSelectionBar: true,
    showTicks: true,
    getSelectionBarColor: (): string => {
      return '#5eead4';
    },
    getPointerColor: (): string => {
      return '#5eead4';
    }
  };

  runtimeRange: number[] = [0,360];
  runtimeOptions: Options = {
    floor: 0,
    ceil: 360,
    step: 30,
    showTicks: true,
    getSelectionBarColor: (): string => {
      return '#5eead4';
    },
    getPointerColor: (): string => {
      return '#5eead4';
    }
  };

  constructor(private route: ActivatedRoute, public tvPageService: TvPageService) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.tvData = data;
      this.dataFormat();
      this.paginationStyle();
    })
  }

  dataFormat(): void {
    this.tvData.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
  }

  paginationStyle(): void {
    
    this.tvPagination = [];
    const totalPages = Math.min(this.tvData.total_pages, 500);
    const currentPage = Math.min(Math.max(this.tvData.page, 1), totalPages);
  
    if (currentPage <= 3) {
      for (let i = 1; i <= 5 && i <= totalPages; i++) {
        this.tvPagination.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        this.tvPagination.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        this.tvPagination.push(i);
      }
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
