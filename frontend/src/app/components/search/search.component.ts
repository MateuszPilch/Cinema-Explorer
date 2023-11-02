import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchData } from 'shared/models/search-data';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchPagination!: number[];
  searchData!: SearchData

  constructor(private route: ActivatedRoute, public searchService: SearchService) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.searchData = data;
      this.dataFormat();
      this.paginationStyle();
      console.log(this.searchData);
    });
  }

  dataFormat(): void {
    this.searchData.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
    this.voteCount();
  }

  paginationStyle(): void {
    this.searchPagination = [];
    if (this.searchService.searchPage <= 2) {
      for (let i = 1; i <= this.searchData.total_pages && i <= 5; i++) {
        this.searchPagination.push(i);
      }
    } else if (this.searchService.searchPage >= this.searchData.total_pages - 1) {
      for (let i = this.searchData.total_pages - 4; i <= this.searchData.total_pages; i++) {
        this.searchPagination.push(i);
      }
    } else {
      for (let i = this.searchService.searchPage - 2; i <= this.searchService.searchPage + 2; i++) {
        this.searchPagination.push(i);
      }
    }
  }

  popularitySort(): void {
    this.searchData.results.sort((a, b) => b.popularity - a.popularity);
  }

  voteAvg(): void {
    this.searchData.results.sort((a, b) => b.vote_average - a.vote_average);
  }

  voteCount(): void {
    this.searchData.results.sort((a, b) => b.vote_count - a.vote_count);
  }
}
