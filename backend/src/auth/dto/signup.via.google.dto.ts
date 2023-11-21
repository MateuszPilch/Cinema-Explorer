import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupViaGoogleDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly nickname: string;
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}