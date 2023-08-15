import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { UserWallet } from './entities/user-wallet.entity';
import { ApiException } from '../../../common/exceptions/api.exception';
import { UserWalletLog } from './entities/user-wallet-log.entity';
import { ReqUserWalletDto } from './dto/req-user-wallet.dto';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly userWalletRepository: Repository<UserWallet>,
    @InjectRepository(UserWalletLog)
    private readonly userWalletLogRepository: Repository<UserWalletLog>,
  ) {}

  create(userId: number): Promise<UserWallet> {
    return this.userWalletRepository.save({ userId, gold: 0 });
  }

  findGold(userId: number): Promise<UserWallet> {
    return this.userWalletRepository.findOneBy({
      userId,
    });
  }

  async updateGold(updateUserWalletDto: UpdateUserWalletDto) {
    const wallet = await this.userWalletRepository.findOneBy({
      userId: updateUserWalletDto.userId,
    });
    let gold = wallet.gold;
    if (updateUserWalletDto.type === '1') {
      gold = gold + updateUserWalletDto.gold;
    } else {
      gold = gold - updateUserWalletDto.gold;
      if (gold < 0) {
        throw new ApiException('金币不足');
      }
    }
    // 更新钱包金额
    await this.userWalletRepository.update(updateUserWalletDto.userId, {
      gold,
    });
    // 写入记录
    await this.userWalletLogRepository.save({
      userId: updateUserWalletDto.userId,
      type: updateUserWalletDto.type,
      remark: updateUserWalletDto.remark,
      gold,
    });
  }

  logs(reqUserWalletDto: ReqUserWalletDto) {
    return this.userWalletLogRepository.findAndCount({
      where: {
        userId: reqUserWalletDto.userId,
      },
      skip: reqUserWalletDto.skip,
      take: reqUserWalletDto.take,
    });
  }
}
