import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from 'shared/models/media/media-details';
import { MediaCredits } from 'shared/models/media/media-credits';

@Component({
  selector: 'app-tv-credits',
  templateUrl: './tv-credits.component.html',
  styleUrls: ['./tv-credits.component.css']
})
export class TvCreditsComponent {

  id!: string | null;
  tvDetailsData!: MediaDetails;
  tvCreditsData!: MediaCredits

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
