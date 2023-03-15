import { IsString } from "class-validator";
import {PaginationDto} from "../../../../common/dto/pagination.dto";

export class QueryMovieRoleDto extends PaginationDto {}

export class QueryAllMovieRoleDto {
  @IsString()
  keyword: string;
}
