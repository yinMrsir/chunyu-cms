import { IsOptional, IsNotEmpty } from "class-validator";
import { PaginationDto } from "../../../../common/dto/pagination.dto";

export class QueryMovieLevelDto extends PaginationDto {
  @IsNotEmpty()
  movieId: number;
}
