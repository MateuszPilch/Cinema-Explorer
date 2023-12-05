import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [HttpModule,AuthModule,MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
