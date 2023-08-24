import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReqCreateMovieListDto,
  ReqListMovieBasicListDto,
  ReqListMovieListDto,
  ReqUpdateMovieListDto,
} from './dto/req-movie-basic.dto';
import { MovieBasic } from './entities/movie-basic.entity';
import { Country } from '../../basic/country/entities/country.entity';
import { Cast } from '../cast/entities/cast.entity';
import { Actor } from '../../actor/actor-list/entities/actor-list.entity';
import { MoviePv } from './entities/movie-pv.entity';
import { ApiException } from '../../../common/exceptions/api.exception';

@Injectable()
export class MovieBasicService {
  constructor(
    @InjectRepository(MovieBasic)
    private readonly movieBasicRepository: Repository<MovieBasic>,
    @InjectRepository(MoviePv)
    private readonly moviePvRepository: Repository<MoviePv>,
  ) {}

  /* 新增影视 */
  create(createMovieListDto: ReqCreateMovieListDto) {
    const moviePv = new MoviePv();
    moviePv.pv = 0;
    createMovieListDto.moviePv = moviePv;
    return this.movieBasicRepository.save(createMovieListDto);
  }

  /* 分页查询影视 */
  async findPageList(reqListMovieListDto: ReqListMovieListDto) {
    const queryBuilder = this.movieBasicRepository
      .createQueryBuilder('movieBasic')
      .leftJoinAndMapMany(
        'movieBasic.country',
        Country,
        'country',
        'FIND_IN_SET(country.id, movieBasic.countryIds)',
      )
      .leftJoinAndMapMany(
        'movieBasic.casts',
        Cast,
        'cast',
        'movieBasic.id = cast.movieId',
      )
      .leftJoinAndMapOne(
        'cast.actor',
        Actor,
        'actor',
        'cast.actorId = actor.id',
      )
      .loadRelationCountAndMap(
        'movieBasic.movieVideosCount',
        'movieBasic.movieVideos',
      )
      .loadRelationCountAndMap(
        'movieBasic.userCollectsCount',
        'movieBasic.userCollects',
      )
      .leftJoinAndSelect('movieBasic.moviePv', 'moviePv')
      .leftJoinAndSelect('movieBasic.movieRate', 'movieRate')
      .select([
        'movieBasic',
        'moviePv.pv',
        'movieRate',
        'country.id',
        'country.name',
        'cast.id',
        'actor.name',
      ]);

    if (reqListMovieListDto.keyword) {
      queryBuilder.where('movieBasic.title like :title', {
        title: `%${reqListMovieListDto.keyword}%`,
      });
    }
    if (reqListMovieListDto.columnValue) {
      queryBuilder.andWhere('movieBasic.columnValue = :columnValue', {
        columnValue: reqListMovieListDto.columnValue,
      });
    }
    if (reqListMovieListDto.genres) {
      queryBuilder.andWhere('FIND_IN_SET(:genres, movieBasic.genres)', {
        genres: reqListMovieListDto.genres,
      });
    }
    if (reqListMovieListDto.country) {
      queryBuilder.andWhere('FIND_IN_SET(:country, movieBasic.countryIds)', {
        country: reqListMovieListDto.country,
      });
    }
    if (reqListMovieListDto.year) {
      queryBuilder.andWhere({ year: reqListMovieListDto.year });
    }
    if (reqListMovieListDto.isPay) {
      queryBuilder.andWhere({ isPay: +reqListMovieListDto.isPay });
    }
    if (reqListMovieListDto.language) {
      queryBuilder.andWhere('FIND_IN_SET(:language, movieBasic.languages)', {
        language: reqListMovieListDto.language,
      });
    }
    if (reqListMovieListDto.date) {
      queryBuilder.andWhere(
        'movieBasic.updateTime BETWEEN :startTime AND :endTime',
        {
          startTime: reqListMovieListDto.date[0] + ' 00:00:00',
          endTime: reqListMovieListDto.date[1] + ' 23:59:59',
        },
      );
    }
    if (reqListMovieListDto.orderBy === 'pv') {
      queryBuilder.orderBy('moviePv.pv', 'DESC');
    } else if (reqListMovieListDto.orderBy === 'rate') {
      queryBuilder.orderBy('movieRate.rate', 'DESC');
    } else {
      queryBuilder.orderBy('movieBasic.updateTime', 'DESC');
    }
    const [rows, total] = await queryBuilder
      .skip(reqListMovieListDto.skip)
      .take(reqListMovieListDto.take)
      .getManyAndCount();
    return {
      rows,
      total,
    };
  }

  /* 榜单 */
  async findBasicList(reqListMovieListDto: ReqListMovieBasicListDto) {
    const queryBuilder = this.movieBasicRepository
      .createQueryBuilder('movieBasic')
      .leftJoinAndSelect('movieBasic.moviePv', 'moviePv')
      .select([
        'movieBasic.title',
        'movieBasic.theEnd',
        'movieBasic.id',
        'movieBasic.updateTime',
        'movieBasic.currentEpisode',
        'movieBasic.columnValue',
        'moviePv.pv',
      ]);
    if (reqListMovieListDto.columnValue) {
      queryBuilder.andWhere('movieBasic.columnValue = :columnValue', {
        columnValue: reqListMovieListDto.columnValue,
      });
    }
    if (reqListMovieListDto.date) {
      queryBuilder.andWhere(
        'movieBasic.updateTime BETWEEN :startTime AND :endTime',
        {
          startTime: reqListMovieListDto.date[0] + ' 00:00:00',
          endTime: reqListMovieListDto.date[1] + ' 23:59:59',
        },
      );
    }
    if (reqListMovieListDto.orderBy === 'pv') {
      queryBuilder.orderBy('moviePv.pv', 'DESC');
    } else {
      queryBuilder.orderBy('movieBasic.updateTime', 'DESC');
    }
    return queryBuilder
      .skip(reqListMovieListDto.skip)
      .take(reqListMovieListDto.take)
      .cache(60000 * 30)
      .getMany();
  }

  /* 通过中文名查询 */
  findByName(title: string) {
    return this.movieBasicRepository.findOneBy({ title });
  }

  /* 通过id查询 */
  findOne(id: number) {
    return this.movieBasicRepository
      .createQueryBuilder('movieBasic')
      .leftJoinAndMapMany(
        'movieBasic.country',
        Country,
        'country',
        'FIND_IN_SET(country.id, movieBasic.countryIds)',
      )
      .leftJoinAndSelect('movieBasic.movieRate', 'movieRate')
      .leftJoinAndSelect('movieBasic.movieVideos', 'movieVideos')
      .leftJoinAndSelect('movieVideos.video', 'video')
      .select([
        'movieBasic',
        'movieVideos.id',
        'movieVideos.title',
        'movieVideos.cover',
        'movieRate',
        'country',
        'video.id',
        'video.poster',
        'video.name',
      ])
      .where({ id })
      .getOne();
  }

  /* 修改影视 */
  update(updateMovieListDto: ReqUpdateMovieListDto) {
    return this.movieBasicRepository.update(
      updateMovieListDto.id,
      updateMovieListDto,
    );
  }

  remove(id: number) {
    return this.movieBasicRepository.delete(id);
  }

  /* 更新pv */
  async updatePv(movieId: number) {
    const moviePv = await this.moviePvRepository.findOne({
      where: {
        movie: { id: movieId },
      },
    });
    if (!moviePv) throw new ApiException('数据不存在');
    await this.moviePvRepository.update(
      { movie: { id: movieId } },
      { pv: moviePv.pv + 1 },
    );
  }
}
