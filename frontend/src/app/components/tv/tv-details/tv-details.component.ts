import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvDetails } from 'shared/models/tv/tv-details';
import { TvCredits } from 'shared/models/tv/tv-credits';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent {

  id!: string | null;
  tvDetailsData!: TvDetails;
  tvCreditsData!: TvCredits;

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
