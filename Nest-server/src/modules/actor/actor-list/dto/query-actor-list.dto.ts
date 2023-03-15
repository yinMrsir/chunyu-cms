import { IsOptional } from 'class-validator';
import {PaginationDto} from "../../../../common/dto/pagination.dto";

export class QueryActorListDto extends PaginationDto {
  @IsOptional()
  name: string;
}

export class QueryActorAllDto {
  @IsOptional()
  keyword: string;
}
