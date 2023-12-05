import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  
  @IsString()
  @MinLength(4)
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8, { message: 'password is too short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
  readonly password: string;

  @MinLength(8, { message: 'password is too short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
  readonly confirmedPassword: string;
}
