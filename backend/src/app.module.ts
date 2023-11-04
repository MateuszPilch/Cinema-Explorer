import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { TvModule } from './tv/tv.module';
import { SearchModule } from './search/search.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [ConfigModule.forRoot(), MovieModule, TvModule, SearchModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
