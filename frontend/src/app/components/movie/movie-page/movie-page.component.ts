import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'ngx-slider-v2';
import { MovieData } from 'shared/models/movie/movie-data';
import { MoviePageService } from 'src/app/services/movie/movie-page.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  isFilterOpen: boolean = false;

  movieData!: MovieData;
  moviePagination!: number[];
  
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

  constructor(private route: ActivatedRoute, public moviePageService: MoviePageService) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.movieData = data;
      this.dataFormat();
      this.paginationStyle();
    })
  }

  dataFormat(): void {
    this.movieData.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
  }

  paginationStyle(): void {
    
    this.moviePagination = [];
    const totalPages = Math.min(this.movieData.total_pages, 500);
    const currentPage = Math.min(Math.max(this.movieData.page, 1), totalPages);
  
    if (currentPage <= 3) {
      for (let i = 1; i <= 5 && i <= totalPages; i++) {
        this.moviePagination.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        this.moviePagination.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        this.moviePagination.push(i);
      }
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}