import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class QueryVideoDto extends PaginationDto {
  @IsOptional()
  title: string;
}
