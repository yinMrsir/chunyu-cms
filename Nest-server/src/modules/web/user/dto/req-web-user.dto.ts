import { WebUser } from '../entities/web-user.entity';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class RegWebUserDto extends WebUser {}

export class LoginWebUserDto {
  email: string;

  password: string;
}

export class QueryWebUserDto extends PaginationDto {}
