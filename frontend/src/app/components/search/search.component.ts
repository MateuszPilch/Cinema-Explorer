import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchData } from 'shared/models/search-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchData!: SearchData
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.searchData = data;
      console.log(this.searchData);
    });
  }
}
