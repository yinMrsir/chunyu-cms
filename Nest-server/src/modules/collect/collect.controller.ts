import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Public } from '../../common/decorators/public.decorator';
import { ReqCreateMovieListDto } from '../movie/basic/dto/req-movie-basic.dto';
import { lastValueFrom, map } from 'rxjs';
import { MovieBasicService } from '../movie/basic/movie-basic.service';
import { ActorListService } from '../actor/actor-list/actor-list.service';
import { Actor } from '../actor/actor-list/entities/actor-list.entity';

@Controller('collect')
export class CollectController {
  constructor(
    private httpService: HttpService,
    private movieBasicService: MovieBasicService,
    private actorListService: ActorListService,
  ) {}

  /**
   * 采集视频基本信息
   * @param query
   */
  @Public()
  @Get('movie')
  async movie(@Query() query) {
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
      req.poster = value.poster.replace('', '/external/');
      req.titleEn = value.title_en;
      req.titleOriginal = value.title_original;
      req.columnValue = 'variety';
      req.pubdate = value.pubdate;
      req.summary = value.summary;
      req.tags = value.tags.join(',');
      req.akas = value.akas.join(',');
      req.duration = value.duration;
      req.theEnd = value.the_end;
      req.languages = value.languages.join(',');
      req.genres = '欧美综艺';
      req.countryIds = '2';

      return this.movieBasicService.create(req);
    });
    await Promise.all(promiseList);
  }

  @Public()
  @Get('actor')
  async actor() {
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
      const actor = new Actor();
      actor.countryId = 1;
      actor.name = value.name;
      actor.nameEn = value.name_en;
      actor.gender = value.gender;
      actor.birthday = value.birthday;
      actor.avatar = value.avatar.replace('', '/external/');
      return this.actorListService.create(actor);
    });
    await Promise.all(promiseList);
  }
}
