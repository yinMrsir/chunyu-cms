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
import { HttpService } from '@nestjs/axios';
import { MovieBasicService } from './movie-basic.service';
import {
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
import { lastValueFrom, map } from 'rxjs';

@Controller('movie')
export class MovieBasicController {
  constructor(
    private httpService: HttpService,
    private readonly movieBasicService: MovieBasicService,
    private readonly pubDateService: PubDateService,
    private readonly movieLevelService: MovieLevelService,
    private readonly castService: CastService,
    private readonly roleActorService: RoleActorService,
    private readonly movieVideoService: MovieVideosService,
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

  @Public()
  @Get('updatePv/:movieId')
  updatePv(@Param('movieId') movieId: string) {
    return this.movieBasicService.updatePv(+movieId);
  }

  /**
   * 采集
   * @param query
   */
  @Public()
  @Get('collect')
  async collect(@Query() query) {
    const queryObj = {
      中国大陆: 1,
      中国香港: 12,
      中国台湾: 13,
      韩国: 8,
      美国: 2,
      日本: 9,
      电影: 'movie',
      电视剧: 'tv',
      动漫: 'cartoon',
      综艺: 'variety',
    };

    const url = ``;
    const headers = {
      Authorization: '',
      'Content-Type': 'application/json',
    };
    const data = await lastValueFrom(
      this.httpService.get(url, { headers }).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );
    const promiseList = data.data.map((value) => {
      const req = new ReqCreateMovieListDto();
      req.title = value.title;
      req.poster = '/external/' + value.poster.replace('', '');
      req.titleEn = value.title_en;
      req.titleOriginal = value.title_original;
      req.columnValue = queryObj[query.category];
      req.pubdate = value.pubdate;
      req.summary = value.summary;
      req.tags = value.tags.join(',');
      req.akas = value.akas.join(',');
      req.duration = value.duration;
      req.theEnd = value.the_end;
      req.languages = value.languages.join(',');
      req.genres = '喜剧片';
      req.countryIds = queryObj[query.country];

      return this.movieBasicService.create(req);
    });
    await Promise.all(promiseList);
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
      this.pubDateService.removeByMovieId(+id), // 删除相关上映时间数据
      this.movieLevelService.removeByMovieId(+id), // 删除相关家长引导数据
      this.castService.removeByMovieId(+id), // 删除关联的影人
      this.movieVideoService.removeByMovieId(+id), // 删除关联视频
      this.movieBasicService.remove(+id), // 删除影视基本数据
    ]);
  }
}
