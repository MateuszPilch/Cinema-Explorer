import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginViaGoogleDto {
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}