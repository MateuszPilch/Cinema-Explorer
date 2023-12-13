import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MediaReviewDto {
  
  @IsNotEmpty()
  @IsNumber()
  readonly media_id: number;

  @IsNotEmpty()
  @IsString()
  readonly media_type: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly poster_path: string;

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