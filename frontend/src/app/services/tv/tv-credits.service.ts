import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TvCredits } from 'shared/models/tv-credits';

@Injectable({
  providedIn: 'root'
})
export class TvCreditsService {
  
  constructor(private http: HttpClient) {}
  
  getTvCredits(id: string): Observable<TvCredits> {
    return this.http.get<TvCredits>(`http://localhost:3000/api/tv/${id}/credits`);
  }

  getTvCreditsShort(id: string): Observable<TvCredits> {
    return this.http.get<TvCredits>(`http://localhost:3000/api/tv/${id}/credits_short`);
  }
}

export const tvCreditsResolver: ResolveFn<TvCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(TvCreditsService).getTvCredits(route.paramMap.get('id')!);
};

export const tvCreditsResolverShort: ResolveFn<TvCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(TvCreditsService).getTvCreditsShort(route.paramMap.get('id')!);
};