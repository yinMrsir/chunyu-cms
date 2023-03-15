import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieVideosService } from './movie-videos.service';
import {
  ReqCreateMovieVideosDto,
  ReqListMovieVideosDto,
  ReqUpdateMovieVideosDto,
} from './dto/req-movie-videos.dto';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('movie/videos')
export class MovieVideosController {
  constructor(private readonly movieVideosService: MovieVideosService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() reqCreateMovieVideosDto: ReqCreateMovieVideosDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqCreateMovieVideosDto.createBy = reqCreateMovieVideosDto.updateBy =
      userName;
    await this.movieVideosService.create(reqCreateMovieVideosDto);
  }

  @Public()
  @Get('list')
  list(@Query(PaginationPipe) reqListMovieVideosDto: ReqListMovieVideosDto) {
    return this.movieVideosService.findPageList(reqListMovieVideosDto);
  }

  @Public()
  @Get(':id')
  async findByIdOne(@Param('id') id: string) {
    const data = await this.movieVideosService.findByIdOne(+id);
    return new DataObj(data);
  }

  @Put()
  async update(
    @Body() reqUpdateMovieVideosDto: ReqUpdateMovieVideosDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateMovieVideosDto.updateBy = userName;
    await this.movieVideosService.update(reqUpdateMovieVideosDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.movieVideosService.delete(+id);
  }
}
