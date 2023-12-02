import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MovieListDto {
  
  @IsNotEmpty()
  @IsNumber()
  readonly movie_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;

}