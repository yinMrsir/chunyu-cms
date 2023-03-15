import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { MovieVideos } from '../entities/movie-videos.entity';

export class ReqCreateMovieVideosDto extends MovieVideos {
  @IsNumber()
  videoId: number;
}

export class ReqUpdateMovieVideosDto extends PartialType(
  ReqCreateMovieVideosDto,
) {
  @IsNumber()
  id: number;
}

export class ReqListMovieVideosDto extends PaginationDto {
  @IsNotEmpty({ message: '影视ID不能为空' })
  @IsOptional()
  movieId: number;

  @IsOptional()
  typeId: string;
}
