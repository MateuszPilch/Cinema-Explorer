import { IsEmail, Matches, MinLength} from 'class-validator';

export class SignupDto {
  
  @Matches(/^[a-zA-Z0-9]{4,20}$/,{message: 'Nazwa użytkownika nie jest poprawna'})
  readonly nickname: string;

  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;

  @MinLength(8, { message: 'Hasło jest za krótkie' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Hasło jest za słabe' })
  readonly password: string;

  readonly confirmedPassword: string;
}
