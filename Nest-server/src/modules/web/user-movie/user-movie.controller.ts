import { Controller, Get, Post, Query, UseGuards, Body } from '@nestjs/common';
import { UserMovieService } from './user-movie.service';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { DataObj } from '../../../common/class/data-obj.class';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { ApiException } from '../../../common/exceptions/api.exception';
import { UserWalletService } from '../user-wallet/user-wallet.service';
import { MovieBasicService } from '../../movie/basic/movie-basic.service';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';
import { UserMovie } from './entities/user-movie.entity';

@Controller('user-movie')
export class UserMovieController {
  constructor(
    private readonly userMovieService: UserMovieService,
    private readonly userWalletService: UserWalletService,
    private readonly movieBasicService: MovieBasicService,
  ) {}

  @Public()
  @Post()
  @UseGuards(JwtWebAuthGuard)
  async buyMovie(
    @User(UserEnum.userId) userId: number,
    @Body() createUserMovieDto: CreateUserMovieDto,
  ) {
    const userMovie: UserMovie = await this.userMovieService.findUserMovie(
      userId,
      createUserMovieDto.movieId,
    );
    if (userMovie) throw new ApiException('您已经购买过此影片');
    const movie: MovieBasic = await this.movieBasicService.findOne(
      createUserMovieDto.movieId,
    );
    await this.userWalletService.updateGold({
      userId,
      gold: movie.paymentAmount,
      type: '2',
      remark: `购买${movie.title} -${movie.paymentAmount}`,
    });
    await this.userMovieService.create(userId, createUserMovieDto.movieId);
  }

  @Public()
  @Get()
  @UseGuards(JwtWebAuthGuard)
  async findUserMovie(
    @User(UserEnum.userId) userId: number,
    @Query() createUserMovieDto: CreateUserMovieDto,
  ) {
    const data = await this.userMovieService.findUserMovie(
      userId,
      createUserMovieDto.movieId,
    );
    return DataObj.create(data);
  }
}
