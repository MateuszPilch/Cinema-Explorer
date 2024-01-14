import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from 'shared/models/person/person-details';
import { PersonCredits } from 'shared/models/person/person-credits';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent {

  id!: string | null;
  personDetailsData!: PersonDetails;
  personCreditsData!: PersonCredits;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({details, credits}) => {
      this.personDetailsData = details;
      this.personCreditsData = credits;
      this.voteCount();

    })
  }
  
  voteCount(): void {
    this.personCreditsData.cast.sort((a, b) => b.vote_count - a.vote_count);
    this.personCreditsData.crew.sort((a, b) => b.popularity - a.popularity);
  }
}