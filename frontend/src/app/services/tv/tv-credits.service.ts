import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaCredits } from '../../../../../shared/models/media/media-credits';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TvCreditsService {
  
  constructor(private http: HttpClient) {}
  
  getTvCredits(tv_id: string): Observable<MediaCredits> {
    return this.http.get<MediaCredits>(`${environment.backendUrl}/tv/${tv_id}/credits`);
  }

  getTvCreditsShort(tv_id: string): Observable<MediaCredits> {
    return this.http.get<MediaCredits>(`${environment.backendUrl}/tv/${tv_id}/credits_short`);
  }
}

export const tvCreditsResolver: ResolveFn<MediaCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(TvCreditsService).getTvCredits(route.paramMap.get('id')!);
};

export const tvCreditsShortResolver: ResolveFn<MediaCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(TvCreditsService).getTvCreditsShort(route.paramMap.get('id')!);
};