import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieLevelDto } from './dto/create-movie-level.dto';
import { UpdateMovieLevelDto } from './dto/update-movie-level.dto';
import { MovieLevel } from './entities/movie-level.entity';
import { QueryMovieLevelDto } from './dto/query-movie-level.dto';
import { Level } from '../../basic/level/entities/level.entity';
import { Country } from '../../basic/country/entities/country.entity';

@Injectable()
export class MovieLevelService {
  constructor(
    @InjectRepository(MovieLevel)
    private readonly movieLevelRepository: Repository<MovieLevel>,
  ) {}

  create(createMovieLevelDto: CreateMovieLevelDto) {
    return this.movieLevelRepository.save(createMovieLevelDto);
  }

  async findPageAll(queryMovieLevelDto: QueryMovieLevelDto) {
    const queryBuilder =
      this.movieLevelRepository.createQueryBuilder('moveLevel');
    if (queryMovieLevelDto.movieId) {
      queryBuilder.where('moveLevel.movieId = :movieId', {
        movieId: queryMovieLevelDto.movieId,
      });
    }
    const query = queryBuilder
      .innerJoinAndMapOne(
        'moveLevel.level',
        Level,
        'level',
        'moveLevel.levelId = level.id',
      )
      .leftJoinAndMapOne(
        'moveLevel.country',
        Country,
        'country',
        'level.countryId = country.id',
      )
      .select('moveLevel.id', 'id')
      .addSelect('moveLevel.levelId', 'levelId')
      .addSelect('level.countryId', 'countryId')
      .addSelect('level.level', 'level')
      .addSelect('level.levelZh', 'levelZh')
      .addSelect('level.descript', 'descript')
      .addSelect('country.name', 'countryName');
    const [rows, total] = await Promise.all([
      query.getRawMany(),
      query.getCount(),
    ]);
    return {
      rows,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} movieLevel`;
  }

  update(updateMovieLevelDto: UpdateMovieLevelDto) {
    return this.movieLevelRepository.update(
      updateMovieLevelDto.id,
      updateMovieLevelDto,
    );
  }

  remove(ids: string) {
    return this.movieLevelRepository.delete(ids.split(','));
  }

  // 根据movieId删除数据
  removeByMovieId(movieId) {
    return this.movieLevelRepository.delete({
      movieId,
    });
  }
}
