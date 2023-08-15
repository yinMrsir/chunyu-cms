import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../../basic/genre/entities/genre.entity';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';
import { Actor } from '../../actor/actor-list/entities/actor-list.entity';
import { Cast } from '../../movie/cast/entities/cast.entity';
import { Columns } from '../../column/entities/column.entity';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Columns)
    private readonly columnsRepository: Repository<Columns>,
    @InjectRepository(MovieBasic)
    private readonly movieBasicRepository: Repository<MovieBasic>,
  ) {}

  async getIndexData() {
    const queryBuilder = this.columnsRepository
      .createQueryBuilder('columns')
      .leftJoinAndMapMany(
        'columns.genres',
        Genre,
        'genre',
        'genre.columnValue = columns.value',
      )
      .select([
        'columns.name',
        'columns.value',
        'columns.type',
        'genre.id',
        'genre.name',
      ])
      .where('columns.type = :type', { type: 1 })
      .orderBy('columns.order', 'ASC')
      .addOrderBy('genre.id', 'ASC');

    const queryData: any[] = await queryBuilder
      .cache(`web:index:columnValue`, 60000 * 30)
      .getMany();

    const columnsIds = queryData.map((value) => value.value);
    // 查询分类下的数据
    const rowsPromises = columnsIds.map((columnValue) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .leftJoinAndMapMany(
          'movieBasic.casts',
          Cast,
          'cast',
          'movieBasic.id = cast.movieId',
        )
        .leftJoinAndSelect('movieBasic.movieRate', 'movieRate')
        .leftJoinAndMapOne(
          'cast.actor',
          Actor,
          'actor',
          'cast.actorId = actor.id',
        )
        .where('movieBasic.columnValue = :columnValue', { columnValue })
        .select([
          'movieBasic.title',
          'movieBasic.poster',
          'movieBasic.id',
          'movieBasic.columnValue',
          'movieBasic.updateTime',
          'movieBasic.createTime',
          'movieRate',
          'cast.id',
          'actor.name',
        ])
        .orderBy('movieBasic.updateTime', 'DESC')
        .take(12)
        .cache(`web:index:${columnValue}:rows`, 60000 * 30)
        .getMany();
    });

    // 查询排名
    const rankPromises = columnsIds.map((columnValue) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .leftJoinAndSelect('movieBasic.moviePv', 'moviePv')
        .select([
          'movieBasic.id',
          'movieBasic.title',
          'movieBasic.columnValue',
          'movieBasic.theEnd',
          'movieBasic.episodeCount',
          'moviePv.pv',
        ])
        .where('movieBasic.columnValue = :columnValue', { columnValue })
        .orderBy('moviePv.pv', 'DESC')
        .take(14)
        .cache(`web:index:${columnValue}:rank`, 60000 * 30)
        .getMany();
    });

    const ranks = await Promise.all(rankPromises);
    const columnsData = await Promise.all(rowsPromises);
    queryData.forEach((item, index) => {
      item.ranks = ranks[index];
      item.rows = columnsData[index];
    });

    return queryData;
  }

  async getTypeData(columnValue: string) {
    const queryBuilder = this.genreRepository
      .createQueryBuilder('genre')
      .select(['genre.name', 'genre.id']);

    const queryData: any[] = await queryBuilder
      .where({ columnValue })
      .cache(`web:type:${columnValue}`, 60000 * 30)
      .getMany();

    const rankNames = queryData.map((value) => value.name);

    const rowsPromises = rankNames.map((name) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .leftJoinAndMapMany(
          'movieBasic.casts',
          Cast,
          'cast',
          'movieBasic.id = cast.movieId',
        )
        .leftJoinAndSelect('movieBasic.movieRate', 'movieRate')
        .leftJoinAndMapOne(
          'cast.actor',
          Actor,
          'actor',
          'cast.actorId = actor.id',
        )
        .where('FIND_IN_SET(:name, movieBasic.genres)', { name })
        .select([
          'movieBasic.title',
          'movieBasic.poster',
          'movieBasic.id',
          'movieBasic.columnValue',
          'movieBasic.updateTime',
          'movieBasic.createTime',
          'movieRate',
          'cast.id',
          'actor.name',
        ])
        .orderBy('movieBasic.updateTime', 'DESC')
        .take(12)
        .cache(`web:type:${columnValue}:${name}:rows`, 60000 * 30)
        .getMany();
    });

    const rankPromises = rankNames.map((name) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .leftJoinAndSelect('movieBasic.moviePv', 'moviePv')
        .select([
          'movieBasic.id',
          'movieBasic.title',
          'movieBasic.columnValue',
          'movieBasic.theEnd',
          'movieBasic.genres',
          'moviePv.pv',
        ])
        .where(
          'movieBasic.columnValue = :columnValue and FIND_IN_SET(:name, movieBasic.genres)',
          { columnValue, name },
        )
        .orderBy('moviePv.pv', 'DESC')
        .take(14)
        .cache(`web:type:${columnValue}:${name}:rank`, 60000 * 30)
        .getMany();
    });

    const ranks = await Promise.all(rankPromises);
    const rows = await Promise.all(rowsPromises);
    queryData.forEach((item, index) => {
      item.ranks = ranks[index];
      item.rows = rows[index];
    });

    return queryData;
  }
}
