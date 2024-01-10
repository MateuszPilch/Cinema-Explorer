import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ValidateViaGoogleDto {
    
  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}