import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AppService } from "../src/app.service";
import { AuthModule } from "../src/auth/auth.module";
import { MapModule } from "../src/map/map.module";
import { UserModule } from "../src/user/user.module";
import { AppController } from "../src/app.controller";


@Module({
  imports: [ConfigModule.forRoot( {
    envFilePath: '.env',
    isGlobal: true,
  }),
  PassportModule.register({session: true}),
  MongooseModule.forRoot(process.env.MONGODB_URI),
  AuthModule, MapModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

