import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonDetails } from '../../../../../shared/models/person/person-details';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  constructor(private http: HttpClient) {}
  getPersonDetails(id:string): Observable<PersonDetails> {
    return this.http.get<PersonDetails>(`${environment.backendUrl}/person/${id}`);
  }
}

export const personDetailsResolver: ResolveFn<PersonDetails> = (route: ActivatedRouteSnapshot) => {
  return inject(PersonDetailsService).getPersonDetails(route.paramMap.get('id')!);
};
