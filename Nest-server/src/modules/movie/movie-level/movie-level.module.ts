import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieLevelService } from './movie-level.service';
import { MovieLevelController } from './movie-level.controller';
import { MovieLevel } from './entities/movie-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieLevel])],
  controllers: [MovieLevelController],
  providers: [MovieLevelService],
  exports: [MovieLevelService],
})
export class MovieLevelModule {}
