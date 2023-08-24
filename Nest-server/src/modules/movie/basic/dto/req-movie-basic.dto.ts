import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { MovieBasic } from '../entities/movie-basic.entity';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class ReqCreateMovieListDto extends MovieBasic {}

export class ReqUpdateMovieListDto extends PartialType(ReqCreateMovieListDto) {
  @IsNumber()
  id: number;
}

export class ReqListMovieListDto extends PaginationDto {
  @IsOptional()
  columnValue?: string;

  @IsOptional()
  genres?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  year?: string;

  @IsOptional()
  language?: string;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  keyword?: string;

  @IsOptional()
  date?: string[];

  @IsOptional()
  isPay?: number;
}

export class ReqListMovieBasicListDto extends PaginationDto {
  @IsOptional()
  columnValue?: string;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  date?: string[];
}

export class LeaderboardDto extends PaginationDto {
  @IsOptional()
  columnValue?: string;
}
