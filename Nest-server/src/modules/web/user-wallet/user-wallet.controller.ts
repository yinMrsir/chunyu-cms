import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @Public()
  @Get('findGold')
  @UseGuards(JwtWebAuthGuard)
  async findGold(@User(UserEnum.userId) userId: number) {
    const data = await this.userWalletService.findGold(userId);
    return DataObj.create(data);
  }
}
