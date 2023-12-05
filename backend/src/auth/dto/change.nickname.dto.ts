import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangeNicknameDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly nickname: string;

  @IsEmail()
  readonly email: string;
}
