import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaDetails } from 'shared/models/media/media-details';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TvDetailsService {

  constructor(private http: HttpClient) {}
  getTvDetails(id:string): Observable<MediaDetails> {
    return this.http.get<MediaDetails>(`http://localhost:3000/api/tv/${id}`);
  }
}

export const tvDetailsResolver: ResolveFn<MediaDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(TvDetailsService).getTvDetails(route.paramMap.get('id')!);
};
