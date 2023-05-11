import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UserRateService } from './user-rate.service';
import { CreateUserRateDto } from './dto/create-user-rate.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { ApiException } from '../../../common/exceptions/api.exception';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('user-rate')
export class UserRateController {
  constructor(private readonly userRateService: UserRateService) {}

  @Public()
  @Post()
  @UseGuards(JwtWebAuthGuard)
  async create(
    @User(UserEnum.userId) userId: number,
    @Body() createUserRateDto: CreateUserRateDto,
  ) {
    const userRate = await this.userRateService.findOne(
      userId,
      createUserRateDto.movieId,
    );
    if (userRate) throw new ApiException('已评分过当前影视');
    await this.userRateService.create({
      userId,
      movieId: createUserRateDto.movieId,
      rate: createUserRateDto.rate,
    });
  }

  @Public()
  @Get()
  @UseGuards(JwtWebAuthGuard)
  async findOne(
    @User(UserEnum.userId) userId: number,
    @Query() query: CreateUserRateDto,
  ) {
    const data = await this.userRateService.findOne(userId, query.movieId);
    return new DataObj(data);
  }
}
