import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeNicknameDto {
  
  @IsNotEmpty( {message: 'Nazwa nie może być pusta'})
  @IsString({ message: 'Nazwa musi być znakiem'})
  @MinLength(4, { message: 'Nazwa jest za krótka'})
  readonly nickname: string;

  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;
}
