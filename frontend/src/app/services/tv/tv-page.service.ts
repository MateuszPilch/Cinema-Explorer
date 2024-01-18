import * as qs from 'qs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router, ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaData } from 'shared/models/media/media-data';
import { TvSearchFilter } from 'shared/models/tv/tv-search-filter';
import { TvGenres } from 'shared/models/tv/tv-genres';

@Injectable({
  providedIn: 'root'
})
export class TvPageService {

  constructor(private http: HttpClient) {}
  
  getTvData(filter: TvSearchFilter): Observable<MediaData> {
    const params = qs.stringify(filter, { encode: false });
    return this.http.get<MediaData>(`http://localhost:3000/api/tv?${params}`);
  }

  getTvGenres(): Observable<TvGenres[]> {
     return this.http.get<TvGenres[]>(`http://localhost:3000/api/tv/genres`);
  }
}