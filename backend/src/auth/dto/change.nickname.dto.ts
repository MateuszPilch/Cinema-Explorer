import { IsEmail, Matches } from 'class-validator';

export class ChangeNicknameDto {
  
  @Matches(/^[a-zA-Z0-9]{4,20}$/,{message: 'Nazwa użytkownika nie jest poprawna'})
  readonly nickname: string;

  @IsEmail({},{ message: 'Email nie jest poprawny' })
  readonly email: string;
}
