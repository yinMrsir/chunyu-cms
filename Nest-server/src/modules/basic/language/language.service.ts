import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {
  ReqCreateLanguageDto,
  ReqUpdateLanguageDto,
  ReqListLanguageDto,
} from './dto/req-language.dto';
import { Language } from './entities/language.entity';
import { Country } from '../country/entities/country.entity';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';

class ResLanguage extends Language {
  movieCount?: number;
}

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(MovieBasic)
    private readonly movieBasicRepository: Repository<MovieBasic>,
  ) {}

  /* 创建语言 */
  create(reqCreateLanguageDto: ReqCreateLanguageDto) {
    return this.languageRepository.save(reqCreateLanguageDto);
  }

  /* 分页查询语言数据 */
  async findPageList(reqListLanguageDto: ReqListLanguageDto) {
    const queryBuilder = this.languageRepository
      .createQueryBuilder('language')
      .leftJoinAndMapOne(
        'language.country',
        Country,
        'country',
        'language.countryId = country.id',
      );
    if (reqListLanguageDto.keyword) {
      queryBuilder.where({ name: Like(`%${reqListLanguageDto.keyword}%`) });
    }
    const [rows, total]: [ResLanguage[], number] = await queryBuilder
      .skip(reqListLanguageDto.skip)
      .take(reqListLanguageDto.take)
      .getManyAndCount();

    const languageNames = rows.map((value) => value.name);
    const movieCountPromises = languageNames.map((name) => {
      return this.movieBasicRepository
        .createQueryBuilder('movieBasic')
        .where('FIND_IN_SET(:name, movieBasic.languages)', { name })
        .getCount();
    });

    const movieCounts = await Promise.all(movieCountPromises);
    rows.forEach((value, index) => {
      value.movieCount = movieCounts[index];
    });
    return { rows, total };
  }

  /* 查询所有语言数据  */
  findAll(reqListLanguageDto: ReqListLanguageDto) {
    const queryBuilder = this.languageRepository.createQueryBuilder('language');
    if (reqListLanguageDto.keyword) {
      queryBuilder.where({ name: Like(`%${reqListLanguageDto.keyword}%`) });
    }
    return queryBuilder.getMany();
  }

  /* 中文简称查询 */
  findByName(name: string) {
    return this.languageRepository.findOneBy({ name });
  }

  /* 更新语言信息 */
  async update(reqUpdateLanguageDto: ReqUpdateLanguageDto) {
    await this.languageRepository.update(
      reqUpdateLanguageDto.id,
      reqUpdateLanguageDto,
    );
  }

  /* 删除语言 */
  delete(ids: string) {
    return this.languageRepository.delete(ids.split(','));
  }
}
