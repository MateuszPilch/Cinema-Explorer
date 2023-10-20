import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie/movie-details.service';
import { MovieDetails } from 'shared/models/movie-details';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movie_id!: string | null;
  movieDetailsData!: MovieDetails;

  constructor(private movieDetailsService: MovieDetailsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.movie_id = this.route.snapshot.paramMap.get('id');
    this.movieDetailsService.getMovieDetails(this.movie_id!).subscribe((data) => {
      this.movieDetailsData = data;
      console.log(this.movieDetailsData);
    });
  }
}
