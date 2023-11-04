import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from 'shared/models/person-details';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent {

  id!: string | null;
  personDetailsData!: PersonDetails;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details}) => {
      this.personDetailsData = details;
      this.voteCount();
      console.log(this.personDetailsData);
    })
  }

  popularitySort(): void {
    this.personDetailsData.combined_credits.cast.sort((a, b) => b.popularity - a.popularity);
    this.personDetailsData.combined_credits.crew.sort((a, b) => b.popularity - a.popularity);
  }

  voteAvg(): void {
    this.personDetailsData.combined_credits.cast.sort((a, b) => b.vote_average - a.vote_average);
    this.personDetailsData.combined_credits.crew.sort((a, b) => b.popularity - a.popularity);
  }

  voteCount(): void {
    this.personDetailsData.combined_credits.cast.sort((a, b) => b.vote_count - a.vote_count);
    this.personDetailsData.combined_credits.crew.sort((a, b) => b.popularity - a.popularity);
  }
}
