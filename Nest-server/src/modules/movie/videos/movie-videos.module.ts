import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieVideos } from './entities/movie-videos.entity';
import { MovieVideosController } from './movie-videos.controller';
import { MovieVideosService } from './movie-videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieVideos])],
  controllers: [MovieVideosController],
  providers: [MovieVideosService],
  exports: [MovieVideosService],
})
export class MovieVideosModule {}
