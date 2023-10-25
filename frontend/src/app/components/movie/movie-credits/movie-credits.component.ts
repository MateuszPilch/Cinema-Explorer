import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCredits } from 'shared/models/movie-credits';
import { MovieCreditsService } from 'src/app/services/movie/movie-credits.service';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.css']
})
export class MovieCreditsComponent {

  movie_id!: string | null;
  movieCreditsData!: MovieCredits

  constructor(private movieCreditsService: MovieCreditsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.movie_id = this.route.snapshot.paramMap.get('id');
    this.movieCreditsService.getMovieCreditsShort(this.movie_id!).subscribe((data) => {
      this.movieCreditsData = data;
    });
  }
}
