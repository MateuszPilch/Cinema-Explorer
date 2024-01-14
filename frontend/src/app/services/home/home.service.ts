import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { SearchData } from 'shared/models/search-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getTrendingResults(time_window: string): Observable<SearchData> {
    return this.http.get<any>(`http://localhost:3000/api/home/trending`, {
      params: {
        time_window
      }
    });
  }
}