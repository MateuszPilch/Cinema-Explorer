import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { TvModule } from './tv/tv.module';
import { SearchModule } from './search/search.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot( {
    envFilePath: '.env',
    isGlobal: true,
  }),
  PassportModule.register({session: true}),
  MongooseModule.forRoot(process.env.MONGODB_URL),
  MovieModule, TvModule, SearchModule, PersonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
