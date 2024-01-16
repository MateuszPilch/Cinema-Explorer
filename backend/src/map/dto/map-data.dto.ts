import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class MapDataDto {
  @IsNotEmpty( {message: 'Nazwa nie może być pusta'})
  @IsString({ message: 'Nazwa musi składać się z liter'})
  readonly name: string;

  @Matches(/^$|^\d{2}:\d{2}:\d{2}$/, { message: 'Nieprawidło wprowadzony czas' })
  readonly runtime!: string;

  @Matches(/^$|^s\d{2}e\d{2}$/, { message: 'Nieprawidło wprowadzony odcinek' })
  readonly episode: string;
  
  @IsString({ message: 'Opis musi być znakiem'})
  readonly description!: string;
  
  @IsNotEmpty( {message: 'Nie wybrano lokacji'})
  readonly center: string;
  
  @IsNotEmpty( {message: ''})
  readonly radius: string;
}