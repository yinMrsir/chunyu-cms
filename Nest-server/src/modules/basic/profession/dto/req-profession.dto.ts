import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Profession } from "../entities/profession.entity";

export class ReqCreateProfessionDto extends Profession {
  /* 父Id */
  @Type()
  @IsNumber()
  parentId: number;
}

export class ReqFindProfessionDto extends PartialType(ReqCreateProfessionDto) {}

export class ReqUpdateProfessionDto extends PartialType(ReqCreateProfessionDto) {}
