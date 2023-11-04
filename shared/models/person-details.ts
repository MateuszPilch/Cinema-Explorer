import { Expose } from 'class-transformer';

export class PersonDetails {
  
  @Expose()
  biography!: string;

  @Expose()
  birthday!: string
  
  @Expose()
  deathday!: string;

  combined_credits!: CombinedCredits; 

  @Expose()
  gender!: number;

  @Expose()
  name!:string;

  @Expose()
  place_of_birth!: string;

  @Expose()
  profile_path!: string;

}

interface CombinedCredits {
  cast: any[];
  crew: any[];
}