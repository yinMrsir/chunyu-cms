import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { Genre } from '../entities/genre.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ReqCreateGenreDto extends Genre {}

export class ReqUpdateGenreDto extends PartialType(ReqCreateGenreDto) {
  @IsNumber()
  id: number;
}

export class ReqListGenreDto extends PaginationDto {
  @IsOptional()
  columnValue: string;

  @IsOptional()
  status: number;
}
