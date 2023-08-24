import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { MovieBasicService } from './movie-basic.service';
import {
  LeaderboardDto,
  ReqCreateMovieListDto,
  ReqListMovieListDto,
  ReqUpdateMovieListDto,
} from './dto/req-movie-basic.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { ApiException } from '../../../common/exceptions/api.exception';
import { DataObj } from '../../../common/class/data-obj.class';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { CastService } from '../cast/cast.service';
import { MovieVideosService } from '../videos/movie-videos.service';
import { PubDateService } from '../pub-date/pub-date.service';
import { MovieLevelService } from '../movie-level/movie-level.service';
import { RoleActorService } from '../role-actor/role-actor.service';
import { UserCollectService } from '../../web/user-collect/user-collect.service';
import * as dayjs from 'dayjs';

@Controller('movie')
export class MovieBasicController {
  constructor(
    private readonly movieBasicService: MovieBasicService,
    private readonly pubDateService: PubDateService,
    private readonly movieLevelService: MovieLevelService,
    private readonly castService: CastService,
    private readonly roleActorService: RoleActorService,
    private readonly movieVideoService: MovieVideosService,
    private readonly userCollectService: UserCollectService,
  ) {}

  @Post()
  async create(
    @Body() createMovieListDto: ReqCreateMovieListDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const movie = await this.movieBasicService.findByName(
      createMovieListDto.title,
    );
    if (movie) throw new ApiException('中文名已存在');
    createMovieListDto.createBy = createMovieListDto.updateBy = userName;
    const { id } = await this.movieBasicService.create(createMovieListDto);
    return new DataObj({ id });
  }

  @Public()
  @Get('list')
  list(@Query(PaginationPipe) reqListMovieListDto: ReqListMovieListDto) {
    return this.movieBasicService.findPageList(reqListMovieListDto);
  }

  /** 周榜单，月榜单 */
  @Public()
  @Get('leaderboard')
  async leaderboard(@Query(PaginationPipe) leaderboardDto: LeaderboardDto) {
    const currTime = dayjs().format('YYYY-MM-DD');
    const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
    const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

    const weekRequest = this.movieBasicService.findBasicList({
      columnValue: leaderboardDto.columnValue,
      skip: leaderboardDto.skip,
      take: leaderboardDto.take,
      orderBy: 'pv',
      date: [weekStartTime, currTime],
    });
    const mouthRequest = this.movieBasicService.findBasicList({
      columnValue: leaderboardDto.columnValue,
      skip: leaderboardDto.skip,
      take: leaderboardDto.take,
      orderBy: 'pv',
      date: [mouthStartTime, currTime],
    });
    const [weekRank, mouthRank] = await Promise.all([
      weekRequest,
      mouthRequest,
    ]);
    return DataObj.create({
      weekRank,
      mouthRank,
    });
  }

  @Public()
  @Get('updatePv/:movieId')
  updatePv(@Param('movieId') movieId: string) {
    return this.movieBasicService.updatePv(+movieId);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.movieBasicService.findOne(+id);
    return new DataObj(data);
  }

  @Put()
  async update(
    @Body() updateMovieListDto: ReqUpdateMovieListDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateMovieListDto.updateBy = userName;
    await this.movieBasicService.update(updateMovieListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await Promise.all([
      this.userCollectService.removeByMovieId(+id), // 删除关联对收藏数据
      this.pubDateService.removeByMovieId(+id), // 删除相关上映时间数据
      this.movieLevelService.removeByMovieId(+id), // 删除相关家长引导数据
      this.castService.removeByMovieId(+id), // 删除关联的影人
      this.movieVideoService.removeByMovieId(+id), // 删除关联视频
      this.movieBasicService.remove(+id), // 删除影视基本数据
    ]);
  }
}
