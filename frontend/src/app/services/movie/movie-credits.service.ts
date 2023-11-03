import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieCredits } from 'shared/models/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class MovieCreditsService {

  constructor(private http: HttpClient) {}
  
  getMovieCredits(id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`http://localhost:3000/api/movie/${id}/credits`);
  }

  getMovieCreditsShort(id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`http://localhost:3000/api/movie/${id}/credits_short`);
  }
}

export const movieCreditsResolver: ResolveFn<MovieCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieCreditsService).getMovieCredits(route.paramMap.get('id')!);
};

export const movieCreditsResolverShort: ResolveFn<MovieCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieCreditsService).getMovieCreditsShort(route.paramMap.get('id')!);
};