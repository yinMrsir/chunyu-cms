import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Country } from "../entities/country.entity";
import { PaginationDto } from "../../../../common/dto/pagination.dto";

export class ReqCreateCountryDto extends Country {}

export class ReqUpdateCountryDto extends PartialType(ReqCreateCountryDto) {
  @IsNumber()
  id: number;
}

export class ReqListCountryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
