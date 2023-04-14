import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserCollectService } from './user-collect.service';
import { CreateUserCollectDto } from './dto/create-user-collect.dto';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('user-collect')
export class UserCollectController {
  constructor(private readonly userCollectService: UserCollectService) {}

  @Post()
  create(@Body() createUserCollectDto: CreateUserCollectDto) {
    return this.userCollectService.create(createUserCollectDto);
  }

  @Public()
  @Get('findByPage')
  @UseGuards(JwtWebAuthGuard)
  findByPage(@User(UserEnum.userId) userId: number) {
    return this.userCollectService.findByPage(userId);
  }

  @Get('findByMovieIdPage')
  findByMovieIdPage(movieId: number) {
    return this.userCollectService.findByMovieIdPage(movieId);
  }

  @Public()
  @Get('find')
  @UseGuards(JwtWebAuthGuard)
  finOne(
    @User(UserEnum.userId) userId: number,
    @Query() query: CreateUserCollectDto,
  ) {
    return this.userCollectService.findOne(userId, query.movieId);
  }

  @Delete()
  remove(@Query() query: CreateUserCollectDto) {
    return this.userCollectService.remove(query.userId, query.movieId);
  }
}
