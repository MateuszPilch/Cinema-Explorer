import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  
  @IsNotEmpty( {message: 'Nazwa nie może być pusta'})
  @IsString({ message: 'Nazwa musi być znakiem'})
  @MinLength(4, { message: 'Nazwa jest za krótka'})
  readonly nickname: string;

  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;

  @MinLength(8, { message: 'Hasło jest za krótkie' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Hasło jest za słabe' })
  readonly password: string;

  @MinLength(8, { message: 'Hasło jest za krótkie' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Hasło jest za słabe' })
  readonly confirmedPassword: string;
}
