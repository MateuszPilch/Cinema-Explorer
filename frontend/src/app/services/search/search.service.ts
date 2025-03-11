import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData } from '../../../../../shared/models/search-data';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchData: SearchData = new SearchData();
  searchType!: string;
  searchQuery!: string;
  searchPage: number = 0;
  isloadingData: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loadSearch();
    this.getSearchResults();
  }

  getSearchResults(): void {
    if(this.searchPage < this.searchData.total_pages) {
      this.isloadingData = true;
      this.searchPage++;
      this.http.get<SearchData>(`${environment.backendUrl}/search`, { 
        params: {
          type: this.searchType,
          query: this.searchQuery,
          page: this.searchPage
        }
      }).subscribe((data) => {
        this.searchData.page = data.page;
        this.searchData.results = this.searchData.results.concat(data.results);
        this.searchData.total_pages = data.total_pages;
        this.searchData.total_results = data.total_results;
        this.isloadingData = false;
      });;
    }
  }
  
  loadSearch(): void {
    this.searchType = sessionStorage.getItem('type') || 'multi';
    this.searchQuery = sessionStorage.getItem('query') || '';
  }

  saveSearch(): void {
    sessionStorage.setItem('type', this.searchType);
    sessionStorage.setItem('query', this.searchQuery);
  }
  
  searchMulti(): void {
    if(this.searchQuery != '') {
      this.searchData = new SearchData();
      this.searchType = 'multi';
      this.searchQuery = this.searchQuery;
      this.searchPage = 0;
      this.saveSearch();
      this.getSearchResults();
      this.router.navigate(['/search']);
    }
  }

  searchByType(type: string): void {
    if(this.searchQuery != '') {
      this.searchData = new SearchData();
      this.searchType = type;
      this.searchPage = 0;
      this.saveSearch();
      this.getSearchResults();
    }
  }
}