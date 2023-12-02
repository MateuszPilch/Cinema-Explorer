import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieController } from './movie.controller';
import { MovieDetailsService} from './movie-details/movie-details.service';
import { MovieCreditsService } from './movie-credits/movie-credits.service';
import { MoviePageService } from './movie-page/movie-page.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [HttpModule,AuthModule,MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [MovieController],
  providers: [MovieDetailsService, MovieCreditsService, MoviePageService],
})
export class MovieModule {}
