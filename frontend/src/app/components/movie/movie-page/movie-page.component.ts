import { Component } from '@angular/core';
import { Options } from 'ngx-slider-v2';
import { MediaData } from '../../../../../../shared/models/media/media-data';
import { MovieGenres } from '../../../../../../shared/models/movie/movie-genres';
import { MovieSearchFilter } from '../../../../../../shared/models/movie/movie-search-filter';
import { MoviePageService } from 'src/app/services/movie/movie-page.service';


@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movieData: MediaData = new MediaData();
  movieGenres!: MovieGenres[];
  movieFilter!: MovieSearchFilter;
  movieGeneresFilter: Set<number> = new Set<number>();
  movieDecadeFilter: number[] = Array.from({ length: 16 }, (_, index) => 1870 + index * 10);

  page: number = 0;
  selectedDecade!: number;
  
  nowDate!: Date;
  todayDateString!: string;
  upcomingDateString!: string;

  isFilterOpen: boolean = false;
  isLoadingData: boolean = false;

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

  constructor(private moviePageService: MoviePageService) {}

  ngOnInit() {
    this.movieFilter = new MovieSearchFilter;
    this.moviePageService.getMovieGenres().subscribe((genres) => {
      this.movieGenres = genres;

    });

    this.loadData();
    this.nowDate = new Date();
    this.todayDateString = this.nowDate.toISOString().split('T')[0];
    this.upcomingDateString = this.nowDate.setMonth(this.nowDate.getMonth() + 6).toString();
  }

  loadData(): void {
    if(this.page < this.movieData.total_pages) {
      this.isLoadingData = true;
      this.page++;
      this.setFilter('page', this.page);
  
      this.moviePageService.getMovieData(this.movieFilter).subscribe((data) => {
        this.movieData.page = data.page;
        this.movieData.results = this.movieData.results.concat(data.results);
        this.movieData.total_pages = data.total_pages
        this.movieData.total_results = data.total_results
        this.isLoadingData = false;
      });
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  setFilter(property: keyof any, value: any): void {
    this.movieFilter.setFilter(property, value);
  }

  setGenre(genre_id: number): void {
    this.movieGeneresFilter.has(genre_id) ? this.movieGeneresFilter.delete(genre_id) : this.movieGeneresFilter.add(genre_id);
  }

  setDecade(decade: number): void {
    this.selectedDecade = decade;
    if(decade != 0) {
      this.setFilter('primary_release_date.gte', `${(decade + 1).toString()}-01-01`);
      this.setFilter('primary_release_date.lte', `${(decade + 10).toString()}-12-31`);
    } else {
      this.setFilter('primary_release_date.gte', ``);
      this.setFilter('primary_release_date.lte', ``);
    }
  }

  applyFilter(): void {
    this.page = 0;
    this.movieData = new MediaData();
    this.setFilter('with_genres',Array.from(this.movieGeneresFilter).join(','));
    this.loadData();
  }

  highestVoteFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('sort_by', 'vote_average.desc');
    this.movieFilter.setFilter('vote_count.gte', 300);
    this.applyFilter();
  }

  popularityFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('sort_by', 'popularity.desc');
    this.applyFilter();
  }

  upcomingFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('primary_release_date.gte', this.todayDateString);
    this.movieFilter.setFilter('primary_release_date.lte', this.upcomingDateString);
    this.movieFilter.setFilter('sort_by', 'popularity.desc');
    this.applyFilter();
  }
}
