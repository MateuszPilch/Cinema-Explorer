import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchData } from '../../../shared/models/search-data';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getTrendingResults(time_window: string): Observable<SearchData> {
    return this.http.get<any>(`${environment.backendUrl}/home/trending`, {
      params: {
        time_window
      }
    });
  }
}