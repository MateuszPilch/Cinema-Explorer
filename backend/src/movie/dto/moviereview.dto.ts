import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieReviewDto {
  
  @IsNotEmpty()
  @IsNumber()
  readonly movie_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;

  @IsBoolean()
  readonly favourite: boolean;

  @IsBoolean()
  readonly to_watch: boolean;

}