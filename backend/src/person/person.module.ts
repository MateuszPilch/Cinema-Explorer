import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PersonController } from './person.controller';
import { PersonDetailsService } from './person-details/person-details.service';
import { PersonCreditsService } from './person-credits/person-credits.service';

@Module({
  imports: [HttpModule],
  controllers: [PersonController],
  providers: [PersonDetailsService, PersonCreditsService]
})
export class PersonModule {}
