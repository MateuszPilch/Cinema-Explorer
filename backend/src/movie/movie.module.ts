import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieController } from './movie.controller';
import { MovieDetailsService} from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieDetailsService, MovieCreditsService],
})
export class MovieModule {}
