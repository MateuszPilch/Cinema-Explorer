import { IsEmail } from 'class-validator';

export class LoginViaGoogleDto {
  
  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;
}