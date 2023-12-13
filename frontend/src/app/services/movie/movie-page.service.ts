import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as qs from 'qs';
import { Observable } from 'rxjs';
import { MovieData } from 'shared/models/movie/movie-data';
import { MovieFilter } from 'shared/models/movie/movie-filter';

@Injectable({
  providedIn: 'root'
})
export class MoviePageService {

  movieFilter!: MovieFilter;

  nowDate: Date;
  todayDateString: string;
  upcomingDateString: string;


  constructor(private http: HttpClient, private router: Router) {
    this.movieFilter = new MovieFilter;
    
    this.nowDate = new Date();
    this.todayDateString = this.nowDate.toISOString().split('T')[0];
    this.upcomingDateString = this.nowDate.setMonth(this.nowDate.getMonth() + 6).toString();

  }
  
  getMovieData(filter: MovieFilter): Observable<MovieData> {
    const params = qs.stringify(filter, { encode: false });
    return this.http.get<MovieData>(`http://localhost:3000/api/movie?${params}`);
  }

  setFilter(property: keyof any, value: any): void {
    this.movieFilter.setFilter(property, value);
  }

  applyFilter(): void {
    this.router.navigate(['movie']);
  }

  changePage(page: number): void {
    this.movieFilter.setFilter('page', page);
    this.router.navigate(['movie']);
  }

  highestVoteFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('sort_by', 'vote_average.desc');
    this.movieFilter.setFilter('vote_count.gte', 300);
    this.router.navigate(['movie']);
  }

  popularityFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('sort_by', 'popularity.desc');
    this.router.navigate(['movie']);
  }

  upcomingFilter(): void {
    this.movieFilter.clearFilter();
    this.movieFilter.setFilter('primary_release_date.gte', this.todayDateString);
    this.movieFilter.setFilter('primary_release_date.lte', this.upcomingDateString);
    this.movieFilter.setFilter('sort_by', 'popularity.desc');
    this.router.navigate(['movie']);
  }
}

export const moviePageResolver: ResolveFn<MovieData> = (route: ActivatedRouteSnapshot) => {
  return inject(MoviePageService).getMovieData(inject(MoviePageService).movieFilter);
};
