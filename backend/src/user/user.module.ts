import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Auth, AuthSchema } from '../schemas/auth.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [HttpModule,AuthModule,MongooseModule.forFeature([
    {name: Auth.name, schema: AuthSchema},
    {name: User.name, schema: UserSchema}
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
