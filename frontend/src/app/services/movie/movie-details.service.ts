import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetails } from 'shared/models/movie-details';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) {}

  getMovieDetails(movie_id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`http://localhost:3000/api/movie/${movie_id}`);
  }
}
