import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'ngx-slider-v2';
import { MediaData } from '../../../../../../shared/models/media/media-data';
import { TvGenres } from '../../../../../../shared/models/tv/tv-genres';
import { TvSearchFilter } from '../../../../../../shared/models/tv/tv-search-filter';
import { TvPageService } from 'src/app/services/tv/tv-page.service';

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.css']
})
export class TvPageComponent {

  tvData: MediaData = new MediaData();
  tvGenres!: TvGenres[];
  tvFilter!: TvSearchFilter;
  tvGeneresFilter: Set<number> = new Set<number>();
  tvDecadeFilter: number[] = Array.from({ length: 16 }, (_, index) => 1870 + index * 10);

  page: number = 0;
  selectedDecade!: number;

  nowDate!: Date;
  todayDateString!: string;
  upcomingDateString!: string;

  isFilterOpen: boolean = false;
  
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

  constructor(private tvPageService: TvPageService) {}

  ngOnInit() {
    this.tvFilter = new TvSearchFilter;
    this.loadData();

    this.tvPageService.getTvGenres().subscribe((genres) => {
      this.tvGenres = genres;
    });

    this.nowDate = new Date();
    this.todayDateString = this.nowDate.toISOString().split('T')[0];
    this.upcomingDateString = this.nowDate.setMonth(this.nowDate.getMonth() + 6).toString();
  }

  loadData(): void {
    this.page += 1;
    this.setFilter('page', this.page);

    this.tvPageService.getTvData(this.tvFilter).subscribe((data) => {
      this.tvData.page = data.page;
      this.tvData.results = this.tvData.results.concat(data.results);
      this.tvData.total_pages = data.total_pages
      this.tvData.total_results = data.total_results
    });
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  setFilter(property: keyof any, value: any): void {
    this.tvFilter.setFilter(property, value);
  }

  setGenre(genre_id: number): void {
    this.tvGeneresFilter.has(genre_id) ? this.tvGeneresFilter.delete(genre_id) : this.tvGeneresFilter.add(genre_id);
  }

  setDecade(decade: number): void {
    this.selectedDecade = decade;
    if(decade != 0) {
    this.setFilter('first_air_date.gte', `${(decade + 1).toString()}-01-01`);
    this.setFilter('first_air_date.lte', `${(decade + 10).toString()}-12-31`);
    } else {
      this.setFilter('first_air_date.gte', ``);
      this.setFilter('first_air_date.lte', ``);
    }
  }

  applyFilter(): void {
    this.page = 0;
    this.tvData = new MediaData();
    this.setFilter('with_genres',Array.from(this.tvGeneresFilter).join(','));
    this.loadData();
  }

  highestVoteFilter(): void {
    this.tvFilter.clearFilter();
    this.tvFilter.setFilter('sort_by', 'vote_average.desc');
    this.tvFilter.setFilter('vote_count.gte', 300);
    this.applyFilter();
  }

  popularityFilter(): void {
    this.tvFilter.clearFilter();
    this.tvFilter.setFilter('sort_by', 'popularity.desc');
    this.applyFilter();
  }

  upcomingFilter(): void {
    this.tvFilter.clearFilter();
    this.tvFilter.setFilter('first_air_date.gte', this.todayDateString);
    this.tvFilter.setFilter('first_air_date.lte', this.upcomingDateString);
    this.tvFilter.setFilter('sort_by', 'popularity.desc');
    this.applyFilter();
  }
}