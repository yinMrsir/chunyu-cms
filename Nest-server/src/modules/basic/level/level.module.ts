import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Level } from "./entities/level.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  controllers: [LevelController],
  providers: [LevelService]
})
export class LevelModule {}
