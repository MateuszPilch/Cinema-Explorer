import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) {}
  
  getMovieDetails(movie_id: string): Observable<MediaDetails> {
    return this.http.get<MediaDetails>(`http://localhost:3000/api/movie/${movie_id}`);
  }
}

export const movieDetailsResolver: ResolveFn<MediaDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieDetails(route.paramMap.get('id')!);
};
