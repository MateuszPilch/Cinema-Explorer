import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) {}
  
  getMovieDetails(movie_id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`http://localhost:3000/api/movie/${movie_id}`);
  }

  getMovieReview(movie_id: number): any {
    firstValueFrom(this.http.get(`http://localhost:3000/api/movie/moviereview`,{
    }));
  }

  addMovieReview(movie_id: number, rating: number, review: string): void {
    firstValueFrom(this.http.post(`http://localhost:3000/api/movie/moviereview`,{
      movie_id,
      rating,
      review
    }));
  }
}

export const movieDetailsResolver: ResolveFn<MovieDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieDetails(route.paramMap.get('id')!);
};
