import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import {
  ReqCreateGenreDto,
  ReqListGenreDto,
  ReqUpdateGenreDto,
} from './dto/req-genre.dto';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  /* 创建类型 */
  async create(reqCreateGenreDto: ReqCreateGenreDto) {
    await this.genreRepository.save(reqCreateGenreDto);
  }

  /* 页面查询类型数据(分页) */
  async findPageAll(reqListGenreDto: ReqListGenreDto) {
    const queryBuilder = this.genreRepository
      .createQueryBuilder('genre')
      .select('genre.id', 'id')
      .addSelect('genre.name', 'name')
      .addSelect('genre.name_en', 'nameEn')
      .addSelect('genre.status', 'status')
      .addSelect('genre.column_value', 'columnValue')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from(MovieBasic, 'movieBasic')
          .where('FIND_IN_SET(genre.name, movieBasic.genres)');
      }, 'count')
      .take(reqListGenreDto.take)
      .skip(reqListGenreDto.skip);

    if (reqListGenreDto.columnValue) {
      queryBuilder.andWhere({ columnValue: reqListGenreDto.columnValue });
    }
    if (reqListGenreDto.status) {
      queryBuilder.andWhere({ status: reqListGenreDto.status });
    }
    const [rows, total] = await Promise.all([
      queryBuilder.getRawMany(),
      queryBuilder.getCount(),
    ]);
    return { rows, total };
  }

  /* 页面查询所有 */
  findAll(reqListGenreDto: ReqListGenreDto) {
    const where: FindOptionsWhere<Genre> = {};
    if (reqListGenreDto.columnValue) {
      where.columnValue = reqListGenreDto.columnValue;
    }
    if (reqListGenreDto.status) {
      where.status = reqListGenreDto.status;
    }
    return this.genreRepository.find({
      where,
      select: ['id', 'name'],
    });
  }

  /* 通过中文名称查找 */
  findByName(name: string) {
    return this.genreRepository.findOneBy({ name });
  }

  /* 更新类型 */
  async update(reqUpdateGenreDto: ReqUpdateGenreDto) {
    await this.genreRepository.update(reqUpdateGenreDto.id, reqUpdateGenreDto);
  }

  /* 删除类型 */
  delete(ids: string) {
    return this.genreRepository.delete(ids.split(','));
  }
}
