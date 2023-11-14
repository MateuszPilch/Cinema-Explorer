import { Expose } from 'class-transformer';

export class PersonDetails {
  
  @Expose()
  biography!: string;

  @Expose()
  birthday!: string
  
  @Expose()
  deathday!: string;

  @Expose()
  gender!: number;

  @Expose()
  known_for_department!: string;

  @Expose()
  name!:string;

  @Expose()
  place_of_birth!: string;

  @Expose()
  profile_path!: string;

}