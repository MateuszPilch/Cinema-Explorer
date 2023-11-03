import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvDetails } from 'shared/models/tv-details';
import { TvCredits } from 'shared/models/tv-credits';

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.css']
})
export class TvPageComponent {

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
