import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaImages } from 'shared/models/media/media-images';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TvDetailsService {

  constructor(private http: HttpClient) {}

  getTvDetails(tv_id: string): Observable<MediaDetails> {
    return this.http.get<MediaDetails>(`http://localhost:3000/api/tv/${tv_id}`);
  }

  getTvImages(tv_id: string): Observable<MediaImages> {
    return this.http.get<MediaImages>(`http://localhost:3000/api/tv/${tv_id}/images`);
  }

  getTvLocationCount(tv_id: string): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/api/map/tv/${tv_id}/count`);
  }
}

export const tvDetailsResolver: ResolveFn<MediaDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(TvDetailsService).getTvDetails(route.paramMap.get('id')!);
};

export const tvImagesResolver: ResolveFn<MediaImages> = (route: ActivatedRouteSnapshot) => {
  return inject(TvDetailsService).getTvImages(route.paramMap.get('id')!);
};

export const tvLocationCountResolver: ResolveFn<number> = (route: ActivatedRouteSnapshot) => {
  return inject(TvDetailsService).getTvLocationCount(route.paramMap.get('id')!);
};