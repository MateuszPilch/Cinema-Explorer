import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie-details/movie-details.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
