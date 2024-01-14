import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';


@Module({
  imports: [HttpModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
