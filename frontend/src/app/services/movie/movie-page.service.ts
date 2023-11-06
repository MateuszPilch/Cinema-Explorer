import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import * as qs from 'qs';
import { Observable } from 'rxjs';
import { MovieData } from 'shared/models/movie/movie-data';
import { MovieFilter } from 'shared/models/movie/movie-filter';

@Injectable({
  providedIn: 'root'
})
export class MoviePageService {

  movieFilter!: MovieFilter;

  constructor(private http: HttpClient) {
    this.loadFilter();
  }
  
  getMovieData(filter: MovieFilter): Observable<MovieData> {
    this.saveFilter();
    const params = qs.stringify(filter, { encode: false });
    return this.http.get<MovieData>(`http://localhost:3000/api/movie?${params}`);
  }

  loadFilter(): void {
    this.movieFilter = JSON.parse(localStorage.getItem('filter')!) || new MovieFilter;
    this.movieFilter.page = 1;
  }

  saveFilter(): void {
    localStorage.setItem('filter', JSON.stringify(this.movieFilter));
  }
}

export const moviePageResolver: ResolveFn<MovieData> = (route: ActivatedRouteSnapshot) => {
  return inject(MoviePageService).getMovieData(inject(MoviePageService).movieFilter);
};
