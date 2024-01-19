import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.loadSearch();
  }

  loadData(): void {
    this.searchService.getSearchResults()
  }
  
  loadSearch(): void {
    this.searchService.loadSearch();
  }

  searchMulti(): void {
    this.searchService.searchMulti();
  }

  searchByType(type: string): void {
    this.searchService.searchByType(type);
  }
}