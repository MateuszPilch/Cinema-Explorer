import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieData } from 'shared/models/movie/movie-data';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movieData!: MovieData;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({data}) => {
      this.movieData = data;
      //this.movieData.results. = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;
      console.log(data);
    })
  }
}
