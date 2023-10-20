export class MovieDetails
{
  budget!: string;
  geners!: Generes[];
  overview!: string;
  poster_path: string = "";
  release_date!: string;
  runtime!: string;
  title!: string;
  vote_average!: number;
  
  constructor()
  {

  }
}

interface Generes
{
  id: number;
  name: string;
}