import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginDto {

  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;

  @IsNotEmpty({ message: 'Hasło nie może być puste' })
  @IsString({ message: 'Hasło nie jest poprawne' })
  readonly password: string;
}
