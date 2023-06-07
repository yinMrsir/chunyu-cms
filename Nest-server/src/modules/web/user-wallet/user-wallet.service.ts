import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { UserWallet } from './entities/user-wallet.entity';
import { ApiException } from '../../../common/exceptions/api.exception';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly userWalletRepository: Repository<UserWallet>,
  ) {}

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
    if (updateUserWalletDto.type === 'add') {
      gold = gold + updateUserWalletDto.gold;
    } else {
      gold = gold - updateUserWalletDto.gold;
      if (gold < 0) {
        throw new ApiException('金币不足');
      }
    }
    await this.userWalletRepository.update(updateUserWalletDto.userId, {
      gold,
    });
  }
}
