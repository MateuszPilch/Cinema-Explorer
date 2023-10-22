import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'shared/models/movie-details';
import { MovieCredits } from 'shared/models/movie-credits';
import { MovieDetailsService } from 'src/app/services/movie/movie-details.service';
import { MovieCreditsService } from 'src/app/services/movie/movie-credits.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movie_id!: string | null;
  movieDetailsData!: MovieDetails;
  movieCreditsData!: MovieCredits

  constructor(private movieDetailsService: MovieDetailsService, private movieCreditsService: MovieCreditsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.movie_id = this.route.snapshot.paramMap.get('id');
    this.movieDetailsService.getMovieDetails(this.movie_id!).subscribe((data) => {
      this.movieDetailsData = data;
      this.movieDetailsData.vote_average = Math.round(this.movieDetailsData.vote_average / 2 * 10) / 10;
      this.movieDetailsData.release_date = this.movieDetailsData.release_date.substring(0,4)
    });

    this.movieCreditsService.getMovieCreditsShort(this.movie_id!).subscribe((data) => {
      this.movieCreditsData = data;
      console.log(this.movieCreditsData);
    });
  }
}
