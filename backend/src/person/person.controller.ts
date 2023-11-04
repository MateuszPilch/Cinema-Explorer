import { Controller, Get, Param } from '@nestjs/common';
import { PersonDetails } from 'shared/models/person-details';
import { PersonDetailsService } from './person-details/person-details.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personDetailsService: PersonDetailsService) {}

  @Get(':id')
  getTvDetails(@Param('id') param: string): Promise<PersonDetails> {
    return this.personDetailsService.getPersonDetails(param);
  }
}
