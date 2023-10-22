import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieCredits } from 'shared/models/movie-credits';

@Injectable({
  providedIn: 'root'
})
export class MovieCreditsService {

  constructor(private http: HttpClient) {}
  
  getMovieCredits(movie_id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`http://localhost:3000/api/movie/${movie_id}/credits`);
  }

  getMovieCreditsShort(movie_id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`http://localhost:3000/api/movie/${movie_id}/credits_short`);
  }
}
