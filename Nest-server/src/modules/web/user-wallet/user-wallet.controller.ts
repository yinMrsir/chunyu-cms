import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { DataObj } from '../../../common/class/data-obj.class';
import { ReqUserWalletDto } from './dto/req-user-wallet.dto';

@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @Public()
  @Get('findGold')
  @UseGuards(JwtWebAuthGuard)
  async findGold(@User(UserEnum.userId) userId: number) {
    let data;
    data = await this.userWalletService.findGold(userId);
    if (!data) {
      data = await this.userWalletService.create(userId);
    }
    return DataObj.create(data);
  }

  @Public()
  @Get('logs')
  @UseGuards(JwtWebAuthGuard)
  async logs(@User(UserEnum.userId) reqUserWalletDto: ReqUserWalletDto) {
    const [rows, total] = await this.userWalletService.logs(reqUserWalletDto);
    return {
      rows,
      total,
    };
  }
}
