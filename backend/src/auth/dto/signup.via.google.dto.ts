import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignupViaGoogleDto {
  
  @Matches(/^[a-zA-Z0-9]{4,20}$/,{message: 'Nazwa użytkownika nie jest poprawna'})
  readonly nickname: string;
  
  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}