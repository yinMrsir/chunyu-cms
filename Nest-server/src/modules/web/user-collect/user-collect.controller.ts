import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserCollectService } from './user-collect.service';
import { CreateUserCollectDto } from './dto/create-user-collect.dto';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';

@Controller('user-collect')
export class UserCollectController {
  constructor(private readonly userCollectService: UserCollectService) {}

  @Public()
  @Post()
  @UseGuards(JwtWebAuthGuard)
  create(
    @User(UserEnum.userId) userId: number,
    @Body() createUserCollectDto: CreateUserCollectDto,
  ) {
    return this.userCollectService.create({
      userId,
      movieId: createUserCollectDto.movieId,
    });
  }

  @Public()
  @Get('findByPage')
  @UseGuards(JwtWebAuthGuard)
  findByPage(
    @User(UserEnum.userId) userId: number,
    @Query(PaginationPipe) query,
  ) {
    return this.userCollectService.findByPage({
      userId,
      ...query,
    });
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
    return this.userCollectService.findOne(userId, +query.movieId);
  }

  @Public()
  @Delete(':movieId')
  @UseGuards(JwtWebAuthGuard)
  remove(
    @User(UserEnum.userId) userId: number,
    @Param('movieId') movieId: number,
  ) {
    return this.userCollectService.remove(userId, movieId);
  }
}
