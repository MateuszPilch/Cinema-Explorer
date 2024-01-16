import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaImages } from 'shared/models/media/media-images';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient) {}
  
  getMovieDetails(movie_id: string): Observable<MediaDetails> {
    return this.http.get<MediaDetails>(`http://localhost:3000/api/movie/${movie_id}`);
  }

  getMovieImages(movie_id: string): Observable<MediaImages> {
    return this.http.get<MediaImages>(`http://localhost:3000/api/movie/${movie_id}/images`);
  }

  getMovieLocationCount(movie_id: string): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/api/map/movie/${movie_id}/count`);
  }
}

export const movieDetailsResolver: ResolveFn<MediaDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieDetails(route.paramMap.get('id')!);
};

export const movieImagesResolver: ResolveFn<MediaImages> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieImages(route.paramMap.get('id')!);
};

export const movieLocationCountResolver: ResolveFn<number> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieDetailsService).getMovieLocationCount(route.paramMap.get('id')!);
};