import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosMovie } from './entities/photos-movie.entity';
import { PhotosMovieController } from './photos-movie.controller';
import { PhotosMovieService } from './photos-movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotosMovie])],
  controllers: [PhotosMovieController],
  providers: [PhotosMovieService],
})
export class PhotosMovieModule {}
