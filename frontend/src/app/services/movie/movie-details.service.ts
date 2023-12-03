import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { MovieDetails } from 'shared/models/movie/movie-details';
import { MovieReview } from 'shared/models/movie/movie-review';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) {}
  
  getMovieDetails(movie_id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`http://localhost:3000/api/movie/${movie_id}`);
  }

  getMovieReview(movie_id: number): Observable<MovieReview> {
    return this.http.get<MovieReview>(`http://localhost:3000/api/movie/moviereview`,{
      params: {
        movie_id
      }
    });
  }

  setMovieReview(movie_id: number, rating: number, review: string, favourite: boolean, to_watch: boolean): void {
    firstValueFrom(this.http.post(`http://localhost:3000/api/movie/moviereview`,{
      movie_id,
      rating,
      review,
      favourite,
      to_watch
    }));
  }
}

export const movieDetailsResolver: ResolveFn<MovieDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieDetails(route.paramMap.get('id')!);
};
