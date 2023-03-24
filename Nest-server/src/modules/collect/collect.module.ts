import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CollectController } from './collect.controller';
import { MovieBasicModule } from '../movie/basic/movie-basic.module';
import { ActorListModule } from '../actor/actor-list/actor-list.module';

@Module({
  imports: [HttpModule, MovieBasicModule, ActorListModule],
  controllers: [CollectController],
})
export class CollectModule {}
