import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaCredits } from '../../../../../shared/models/media/media-credits';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MovieCreditsService {

  constructor(private http: HttpClient) {}
  
  getMovieCredits(id: string): Observable<MediaCredits> {
    return this.http.get<MediaCredits>(`${environment.backendUrl}/movie/${id}/credits`);
  }

  getMovieShortCredits(id: string): Observable<MediaCredits> {
    return this.http.get<MediaCredits>(`${environment.backendUrl}/movie/${id}/credits_short`);
  }
}

export const movieCreditsResolver: ResolveFn<MediaCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieCreditsService).getMovieCredits(route.paramMap.get('id')!);
};

export const movieCreditsShortResolver: ResolveFn<MediaCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(MovieCreditsService).getMovieShortCredits(route.paramMap.get('id')!);
};