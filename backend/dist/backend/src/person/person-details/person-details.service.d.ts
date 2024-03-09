import { HttpService } from '@nestjs/axios';
import { PersonDetails } from 'shared/models/person/person-details';
export declare class PersonDetailsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPersonDetails(id: string): Promise<PersonDetails>;
}
