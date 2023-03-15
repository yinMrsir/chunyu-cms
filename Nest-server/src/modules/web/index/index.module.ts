import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../../basic/genre/entities/genre.entity';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';
import { Columns } from '../../column/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Columns, MovieBasic])],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
