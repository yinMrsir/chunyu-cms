import { Module } from '@nestjs/common';
import { UserRateService } from './user-rate.service';
import { UserRateController } from './user-rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRate } from './entities/user-rate.entity';
import { MovieRate } from '../../movie/basic/entities/movie-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRate, MovieRate])],
  controllers: [UserRateController],
  providers: [UserRateService],
})
export class UserRateModule {}
