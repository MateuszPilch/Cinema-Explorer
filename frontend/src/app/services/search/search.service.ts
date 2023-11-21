import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { SearchData } from 'shared/models/search-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchType!: string;
  searchQuery!: string;
  searchPage!: number;

  constructor(private http: HttpClient, private router: Router) {    
    this.loadSearch();
  }

  getSearchResults(type: string, query: string, page: string): Observable<SearchData> {
    this.searchType = type;
    this.searchQuery = query;
    this.searchPage = Number(page);
    this.saveSearch();
    return this.http.get<SearchData>(`http://localhost:3000/api/search`, { 
      params: {
        type: type,
        query: query,
        page: page
      }
    });
  }

  loadSearch(): void {
    this.searchType = sessionStorage.getItem('type') || 'multi';
    this.searchQuery = sessionStorage.getItem('query') || '';
  }

  saveSearch(): void {
    sessionStorage.setItem('type', this.searchType);
    sessionStorage.setItem('query', this.searchQuery);
  }

  search(): void {
    this.saveSearch();
    this.router.navigate(['search'], { 
      queryParams: { 
        type: this.searchType,
        query: this.searchQuery, 
        page: this.searchPage
      }
    });
  }

  searchMulti(): void {
    if(this.searchQuery != '') {
      this.searchType = 'multi';
      this.searchQuery = this.searchQuery;
      this.searchPage = 1;
      this.search();
    }
  }

  searchByType(type: string): void {
    if(this.searchQuery != '') {
      this.searchType = type;
      this.searchPage = 1;
      this.search();
    }
  }

  changePage(page: number): void {
    this.searchPage = page;
    this.search();
  }
}

export const searchResolver: ResolveFn<SearchData> = (route: ActivatedRouteSnapshot) => {
  return inject(SearchService).getSearchResults(route.queryParams['type'], route.queryParams['query'],route.queryParams['page']);
};