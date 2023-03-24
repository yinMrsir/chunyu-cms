import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorListService } from './actor-list.service';
import { ActorListController } from './actor-list.controller';
import { Actor } from './entities/actor-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorListController],
  providers: [ActorListService],
  exports: [ActorListService],
})
export class ActorListModule {}
