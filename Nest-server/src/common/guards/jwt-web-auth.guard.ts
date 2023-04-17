import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class JwtWebAuthGuard extends AuthGuard('jwt-web') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new ApiException('登录状态已过期', 401);
    }
    return user;
  }
}
