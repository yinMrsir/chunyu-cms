import { WebUser } from '../entities/web-user.entity';

export class RegWebUserDto extends WebUser {}

export class LoginWebUserDto {
  email: string;

  password: string;
}
