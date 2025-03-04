import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDetails } from '../../../shared/models/media/media-details';
import { MediaCredits } from '../../../shared/models/media/media-credits';

@Component({
  selector: 'app-tv-credits',
  templateUrl: './tv-credits.component.html',
  styleUrls: ['./tv-credits.component.css']
})
export class TvCreditsComponent {

  id!: string | null;
  tvDetailsData!: MediaDetails;
  tvCreditsData!: MediaCredits

  creditsFilter: string = 'all';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details, credits}) => {
      this.tvDetailsData = details;
      this.tvCreditsData = credits;
    });
  }

  setFilter(filter: string): void {
    this.creditsFilter = filter;
  }
}
