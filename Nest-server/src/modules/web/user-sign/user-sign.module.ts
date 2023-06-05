import { Module } from '@nestjs/common';
import { UserSignService } from './user-sign.service';
import { UserSignController } from './user-sign.controller';
import { UserSign } from './entities/user-sign.entity';
import { UserSignLog } from './entities/user-sign-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserSign, UserSignLog])],
  controllers: [UserSignController],
  providers: [UserSignService],
})
export class UserSignModule {}
