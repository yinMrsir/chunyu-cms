import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWalletService } from './user-wallet.service';
import { UserWalletController } from './user-wallet.controller';
import { UserWallet } from './entities/user-wallet.entity';
import { UserWalletLog } from './entities/user-wallet-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWallet, UserWalletLog])],
  controllers: [UserWalletController],
  providers: [UserWalletService],
  exports: [UserWalletService],
})
export class UserWalletModule {}
