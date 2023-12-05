import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieReview } from 'shared/models/movie/movie-review';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getMovieList(): Observable<MovieReview[]> {
    return this.http.get<MovieReview[]>(`http://localhost:3000/api/user/movielist`,{
    });
  }

  getMovieReview(movie_id: number): Observable<MovieReview> {
    return this.http.get<MovieReview>(`http://localhost:3000/api/user/moviereview`,{
      params: {
        movie_id
      }
    });
  }

  setMovieReview(movie_id: number,title: string, poster_path: string, rating: number, review: string, favourite: boolean, to_watch: boolean): void {
    firstValueFrom(this.http.post(`http://localhost:3000/api/user/moviereview`,{
      movie_id,
      title,
      poster_path,
      rating,
      review,
      favourite,
      to_watch
    }));
  }
}
