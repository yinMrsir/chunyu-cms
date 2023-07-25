import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMovieService } from './user-movie.service';
import { UserMovieController } from './user-movie.controller';
import { UserMovie } from './entities/user-movie.entity';
import { UserWalletModule } from '../user-wallet/user-wallet.module';
import { MovieBasicModule } from '../../movie/basic/movie-basic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMovie]),
    UserWalletModule,
    MovieBasicModule,
  ],
  controllers: [UserMovieController],
  providers: [UserMovieService],
  exports: [UserMovieService],
})
export class UserMovieModule {}
