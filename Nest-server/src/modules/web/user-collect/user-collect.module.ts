import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCollectService } from './user-collect.service';
import { UserCollectController } from './user-collect.controller';
import { UserCollect } from './entities/user-collect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCollect])],
  controllers: [UserCollectController],
  providers: [UserCollectService],
  exports: [UserCollectService],
})
export class UserCollectModule {}
