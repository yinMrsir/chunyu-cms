import { PhotosMovie } from '../entities/photos-movie.entity';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { IsOptional } from 'class-validator';

export class ReqCreatePhotosMovieDto extends PhotosMovie {}

export class ReqListPhotosMovieDto extends PaginationDto {
  @IsOptional()
  movieId: number;

  @IsOptional()
  type: string;

  @IsOptional()
  status: string;
}
