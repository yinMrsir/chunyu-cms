import { WebUser } from '../entities/web-user.entity';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { IsNumber, IsString } from 'class-validator';

export class RegWebUserDto extends WebUser {}

export class LoginWebUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class QueryWebUserDto extends PaginationDto {}

export class ChangeWebUserStatusDto {
  @IsNumber()
  userId: number;

  @IsString()
  status: string;
}
