import { PartialType } from '@nestjs/mapped-types';
import { Level } from "../entities/level.entity";
import { PaginationDto } from "../../../../common/dto/pagination.dto";

export class ReqCreateLevelDto extends Level {}

export class ReqListLevelDto extends PaginationDto {}

export class ReqUpdateLevelDto extends PartialType(ReqCreateLevelDto) {}
