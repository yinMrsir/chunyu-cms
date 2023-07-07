import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { IsNumber } from 'class-validator';

export class ReqUserWalletDto extends PaginationDto {
  @IsNumber()
  userId: number;
}
