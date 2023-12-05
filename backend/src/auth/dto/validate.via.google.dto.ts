import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ValidateViaGoogleDto {
    
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}