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
      .leftJoinAndMapMany(
        'columns.rows',
        MovieBasic,
        'movieBasic',
        'movieBasic.columnValue = columns.value',
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
      .orderBy('columns.order', 'ASC')
      .addOrderBy('genre.id', 'ASC')
      .select([
        'columns.name',
        'columns.value',
        'genre.id',
        'genre.name',
        'movieBasic.title',
        'movieBasic.poster',
        'movieBasic.id',
        'movieBasic.columnValue',
        'cast.id',
        'actor.name',
      ]);

    const queryData: any[] = await queryBuilder.getMany();

    // 查询排名
    const rankIds = queryData.map((value) => value.value);
    const rankPromises = rankIds.map((columnValue) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .leftJoinAndSelect('movieBasic.moviePv', 'moviePv')
        .select([
          'movieBasic.id',
          'movieBasic.title',
          'movieBasic.columnValue',
          'movieBasic.theEnd',
          'moviePv.pv',
        ])
        .where('movieBasic.columnValue = :columnValue', { columnValue })
        .orderBy('moviePv.pv', 'DESC')
        .take(10)
        .getMany();
    });

    const ranks = await Promise.all(rankPromises);

    queryData.forEach((item, index) => {
      item.ranks = ranks[index];
    });

    return queryData;
  }

  async getTypeData(columnValue: string) {
    const queryBuilder = this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndMapMany(
        'genre.rows',
        MovieBasic,
        'movieBasic',
        'FIND_IN_SET(genre.name, movieBasic.genres)',
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
      .select([
        'genre.name',
        'genre.id',
        'movieBasic.title',
        'movieBasic.poster',
        'movieBasic.id',
        'movieBasic.columnValue',
        'cast.id',
        'actor.name',
      ]);

    const queryData: any[] = await queryBuilder
      .where({ columnValue })
      .getMany();

    const rankNames = queryData.map((value) => value.name);
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
        .take(10)
        .getMany();
    });

    const ranks = await Promise.all(rankPromises);
    queryData.forEach((item, index) => {
      item.ranks = ranks[index];
    });

    return queryData;
  }
}
