import { IsOptional } from "class-validator";
import {PaginationDto} from "../../../../common/dto/pagination.dto";

export class QueryCastDto extends PaginationDto {
  @IsOptional()
  movieId: number;
}
