import { HttpService } from '@nestjs/axios';
import { PersonCredits } from 'shared/models/person/person-credits';
export declare class PersonCreditsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPersonCredits(id: string): Promise<PersonCredits>;
}
