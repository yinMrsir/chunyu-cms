import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, IsOptional } from 'class-validator'
import { Language } from "../entities/language.entity";
import { PaginationDto } from "../../../../common/dto/pagination.dto";

export class ReqCreateLanguageDto extends Language {}

export class ReqUpdateLanguageDto extends PartialType(ReqCreateLanguageDto) {
  @IsNumber()
  id: number;
}

export class ReqListLanguageDto extends PaginationDto {
  @IsOptional()
  @IsString()
  keyword: string;
}
