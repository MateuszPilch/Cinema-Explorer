import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginViaGoogleDto {
  
  @IsEmail()
  readonly email: string;
}