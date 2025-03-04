import { Controller, Get, Param } from '@nestjs/common';
import { PersonDetails } from '../../../shared/models/person/person-details';
import { PersonCredits } from '../../../shared/models/person/person-credits';
import { PersonDetailsService } from './person-details/person-details.service';
import { PersonCreditsService } from './person-credits/person-credits.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personDetailsService: PersonDetailsService, private readonly personCreditsService: PersonCreditsService) {}

  @Get(':id')
  getPersonDetails(@Param('id') param: string): Promise<PersonDetails> {
    return this.personDetailsService.getPersonDetails(param);
  }

  @Get(':id/combined_credits')
  getPersonCredits(@Param('id') param: string): Promise<PersonCredits> {
    return this.personCreditsService.getPersonCredits(param);
  }
}
