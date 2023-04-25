import { Injectable } from '@nestjs/common';
import { WebUserService } from '../user/web-user.service';
import { ApiException } from '../../../common/exceptions/api.exception';
import { SharedService } from '../../../shared/shared.service';

@Injectable()
export class WebAuthService {
  constructor(
    private readonly webUserService: WebUserService,
    private readonly sharedService: SharedService,
  ) {}

  async validateUser(email, password) {
    const user = await this.webUserService.findByEmail(email);
    if (!user) throw new ApiException('用户名不存在');
    if (+user.status === 1) throw new ApiException('用户已禁用');
    const comparePassword = this.sharedService.md5(password + user.salt);
    if (comparePassword !== user.password)
      throw new ApiException('用户名或密码错误');
    return user;
  }
}
