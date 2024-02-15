import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginViaGoogleDto {
  
  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;
  
  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}