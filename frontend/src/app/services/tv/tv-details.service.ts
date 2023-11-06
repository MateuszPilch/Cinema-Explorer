import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvDetails } from 'shared/models/tv/tv-details';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TvDetailsService {

  constructor(private http: HttpClient) {}
  getTvDetails(id:string): Observable<TvDetails> {
    return this.http.get<TvDetails>(`http://localhost:3000/api/tv/${id}`);
  }
}

export const tvDetailsResolver: ResolveFn<TvDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(TvDetailsService).getTvDetails(route.paramMap.get('id')!);
};
