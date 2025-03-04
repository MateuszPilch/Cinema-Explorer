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
import { UserModule } from './user/user.module';
import { MapModule } from './map/map.module';
import { HomeModule } from './home/home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot( {
    envFilePath: '.env',
    isGlobal: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'frontend'),
  }),
  PassportModule.register({session: true}),
  MongooseModule.forRoot(process.env.MONGODB_URI, {
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('Connected to MongoDB');
      });
      connection.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
      });
      return connection;
    },
  }),
  AuthModule, HomeModule, MapModule, MovieModule, TvModule, SearchModule, PersonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

