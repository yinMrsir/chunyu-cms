import { PaginationDto } from '../../../common/dto/pagination.dto';
import { IsOptional } from 'class-validator';

export class QueryColumnDto extends PaginationDto {
  @IsOptional()
  type?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  value?: string;
}
