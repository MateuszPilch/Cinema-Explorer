import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvCredits } from 'shared/models/tv/tv-credits';
import { TvDetails } from 'shared/models/tv/tv-details';

@Component({
  selector: 'app-tv-credits',
  templateUrl: './tv-credits.component.html',
  styleUrls: ['./tv-credits.component.css']
})
export class TvCreditsComponent {

  id!: string | null;
  tvDetailsData!: TvDetails;
  tvCreditsData!: TvCredits

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.tvDetailsData = details;
      this.tvDetailsData.vote_average = Math.round(this.tvDetailsData.vote_average / 2 * 10) / 10;
    })

    this.route.data.subscribe(({credits}) => {
      this.tvCreditsData = credits;
    })
  }
}
