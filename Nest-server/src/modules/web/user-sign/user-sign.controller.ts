import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserSignService } from './user-sign.service';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { DataObj } from '../../../common/class/data-obj.class';
import { ApiException } from '../../../common/exceptions/api.exception';

@Controller('user-sign')
export class UserSignController {
  constructor(private readonly userSignService: UserSignService) {}

  /** 查询用户今日是否签到 */
  @Public()
  @Get('getSign')
  @UseGuards(JwtWebAuthGuard)
  async getSign(@User(UserEnum.userId) userId: number) {
    const data = await this.userSignService.findUserSign(userId);
    return DataObj.create(data);
  }

  @Public()
  @Get('sign')
  @UseGuards(JwtWebAuthGuard)
  async sign(@User(UserEnum.userId) userId: number) {
    // 查询是否已签到过
    const data = await this.userSignService.findUserSign(userId);
    if (data) throw new ApiException('用户今日已签到过，请勿重复签到');
    const content = await this.userSignService.sign(userId);
    return DataObj.create(content);
  }
}
