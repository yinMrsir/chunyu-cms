import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieVideos } from './entities/movie-videos.entity';
import {
  ReqCreateMovieVideosDto,
  ReqListMovieVideosDto,
  ReqUpdateMovieVideosDto,
} from './dto/req-movie-videos.dto';
import { MovieBasic } from '../basic/entities/movie-basic.entity';
import { Country } from '../../basic/country/entities/country.entity';
import { Video } from '../../video/video-list/entities/video.entity';

@Injectable()
export class MovieVideosService {
  constructor(
    @InjectRepository(MovieVideos)
    private readonly movieVideosRepository: Repository<MovieVideos>,
  ) {}

  create(reqCreateMovieVideosDto: ReqCreateMovieVideosDto) {
    return this.movieVideosRepository.save(reqCreateMovieVideosDto);
  }

  async findPageList(reqListMovieVideosDto: ReqListMovieVideosDto) {
    const queryBuilder = this.movieVideosRepository
      .createQueryBuilder('movieVideos')
      .leftJoinAndSelect('movieVideos.video', 'video');

    queryBuilder.where('movieVideos.movieId = :movieId', {
      movieId: reqListMovieVideosDto.movieId,
    });

    if (reqListMovieVideosDto.typeId) {
      queryBuilder.andWhere('movieVideos.typeId = :typeId', {
        typeId: reqListMovieVideosDto.typeId,
      });
    }
    const [rows, total] = await queryBuilder
      .take(reqListMovieVideosDto.take)
      .skip(reqListMovieVideosDto.skip)
      .orderBy({ 'movieVideos.sort': 'ASC' })
      .getManyAndCount();

    return {
      rows,
      total,
    };
  }

  // 通过id查询
  findByIdOne(id: number) {
    const queryBuilder = this.movieVideosRepository
      .createQueryBuilder('movieVideos')
      .innerJoinAndMapOne(
        'movieVideos.movie',
        MovieBasic,
        'movieBasic',
        'movieVideos.movieId = movieBasic.id',
      )
      .leftJoinAndSelect('movieBasic.movieRate', 'movieRate')
      .leftJoinAndMapMany(
        'movieVideos.country',
        Country,
        'country',
        'FIND_IN_SET(country.id, movieBasic.countryIds)',
      )
      .leftJoinAndMapOne(
        'movieVideos.videoInfo',
        Video,
        'videoInfo',
        'videoInfo.id = movieVideos.videoId',
      )
      .leftJoinAndMapMany(
        'movieVideos.videos',
        MovieVideos,
        'videos',
        'movieBasic.id = videos.movieId',
      )
      .leftJoinAndMapOne(
        'videos.video',
        Video,
        'videoList',
        'videoList.id = videos.videoId',
      )
      .select([
        'movieVideos.title',
        'movieVideos.movieId',
        'movieVideos.typeId',
        'movieBasic.title',
        'movieBasic.year',
        'movieBasic.genres',
        'movieBasic.columnValue',
        'movieBasic.summary',
        'movieBasic.isPay',
        'movieBasic.freeDuration',
        'movieBasic.paymentAmount',
        'movieRate',
        'country.name',
        'videos.id',
        'videos.title',
        'videos.cover',
        'videoList.poster',
        'videoList.name',
        'videoInfo.url',
      ])
      .where({ id });

    return queryBuilder.getOne();
  }

  update(reqUpdateMovieVideosDto: ReqUpdateMovieVideosDto) {
    return this.movieVideosRepository.update(
      reqUpdateMovieVideosDto.id,
      reqUpdateMovieVideosDto,
    );
  }

  delete(id: number) {
    return this.movieVideosRepository.delete(id);
  }

  // 根据movieId删除数据
  removeByMovieId(movieId) {
    return this.movieVideosRepository.delete({
      movieId,
    });
  }
}
