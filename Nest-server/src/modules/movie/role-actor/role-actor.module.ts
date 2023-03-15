import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleActorService } from './role-actor.service';
import { RoleActorController } from './role-actor.controller';
import { RoleActor } from './entities/role-actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleActor])],
  controllers: [RoleActorController],
  providers: [RoleActorService],
  exports: [RoleActorService],
})
export class RoleActorModule {}
