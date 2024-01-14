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
    });
  }

  dataFormat(): void {
    this.searchData.results.forEach((a)=> a.vote_average = Math.round(a.vote_average / 2 * 10) / 10);
    this.popularitySort();
  }

  paginationStyle(): void {
    this.searchPagination = [];
    const totalPages = Math.min(this.searchData.total_pages, 500);
    const currentPage = Math.min(Math.max(this.searchData.page, 1), totalPages);

    if (currentPage <= 3) {
      for (let i = 1; i <= 5 && i <= totalPages; i++) {
        this.searchPagination.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        this.searchPagination.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        this.searchPagination.push(i);
      }
    }
  }

  popularitySort(): void {
    this.searchData.results.sort((a, b) => b.popularity - a.popularity);
  }
}