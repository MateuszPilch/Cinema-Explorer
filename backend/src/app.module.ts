import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
