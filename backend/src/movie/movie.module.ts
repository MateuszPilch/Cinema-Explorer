import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieController } from './movie.controller';
import { MovieDetailsService} from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { SearchService } from 'src/search/search.service';
import { MoviePageService } from './movie-page/movie-page.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieDetailsService, MovieCreditsService, MoviePageService],
})
export class MovieModule {}
