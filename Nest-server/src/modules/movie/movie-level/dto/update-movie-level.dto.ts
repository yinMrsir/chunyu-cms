import { IsNumber } from 'class-validator';
import { CreateMovieLevelDto } from "./create-movie-level.dto";

export class UpdateMovieLevelDto extends CreateMovieLevelDto {
  @IsNumber()
  id: number;
}
