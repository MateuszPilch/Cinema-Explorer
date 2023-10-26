import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { SearchData } from 'shared/models/search-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  getSearchResults(query: string, page: string): Observable<SearchData> {
    return this.http.get<SearchData>(`http://localhost:3000/api/search?query=${query}`,{params: {page: page}});
  }
}

export const searchResolver: ResolveFn<SearchData> = (route: ActivatedRouteSnapshot) => {
  return inject(SearchService).getSearchResults(route.queryParams['query'],route.queryParams['page']);
};