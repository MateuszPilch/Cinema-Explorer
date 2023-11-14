import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonCredits } from 'shared/models/person/person-credits';

@Injectable({
  providedIn: 'root'
})
export class PersonCreditsService {

  constructor(private http: HttpClient) {}
  getPersonCredits(id:string): Observable<PersonCredits> {
    return this.http.get<PersonCredits>(`http://localhost:3000/api/person/${id}/combined_credits`);
  }
}

export const personCreditsResolver: ResolveFn<PersonCredits> = (route: ActivatedRouteSnapshot) => {
  return inject(PersonCreditsService).getPersonCredits(route.paramMap.get('id')!);
};
