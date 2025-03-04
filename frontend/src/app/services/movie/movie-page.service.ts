import * as qs from 'qs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaData } from 'shared/models/media/media-data';
import { MovieSearchFilter } from 'shared/models/movie/movie-search-filter';
import { MovieGenres } from 'shared/models/movie/movie-genres';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MoviePageService {

  constructor(private http: HttpClient) {}
  
  getMovieData(filter: MovieSearchFilter): Observable<MediaData> {
    const params = qs.stringify(filter, { encode: false });
    return this.http.get<MediaData>(`${environment.backendUrl}/movie?${params}`);
  }

  getMovieGenres(): Observable<MovieGenres[]> {
     return this.http.get<MovieGenres[]>(`${environment.backendUrl}/movie/genres`);
  }
}