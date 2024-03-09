import { PersonDetails } from 'shared/models/person/person-details';
import { PersonCredits } from 'shared/models/person/person-credits';
import { PersonDetailsService } from './person-details/person-details.service';
import { PersonCreditsService } from './person-credits/person-credits.service';
export declare class PersonController {
    private readonly personDetailsService;
    private readonly personCreditsService;
    constructor(personDetailsService: PersonDetailsService, personCreditsService: PersonCreditsService);
    getPersonDetails(param: string): Promise<PersonDetails>;
    getPersonCredits(param: string): Promise<PersonCredits>;
}
