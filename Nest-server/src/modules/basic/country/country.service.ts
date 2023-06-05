import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqCreateCountryDto, ReqListCountryDto } from './dto/req-country.dto';
import { ReqUpdateCountryDto } from './dto/req-country.dto';
import { Country } from './entities/country.entity';
import { Level } from '../level/entities/level.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  /* 创建国家 */
  create(reqCreateCountryDto: ReqCreateCountryDto) {
    return this.countryRepository.save(reqCreateCountryDto);
  }

  /* 分页查询国家列表 */
  async findPageList(reqListCountryDto: ReqListCountryDto) {
    const where: FindOptionsWhere<Country> = {};
    if (reqListCountryDto.keyword) {
      where.name = Like(`%${reqListCountryDto.keyword}%`);
    }
    const [rows, total] = await this.countryRepository.findAndCount({
      skip: reqListCountryDto.skip,
      take: reqListCountryDto.take,
      where,
    });
    return { rows, total };
  }

  /* 查询所有国家列表 */
  findAll(reqListCountryDto: ReqListCountryDto) {
    const where: FindOptionsWhere<Country> = {};
    if (reqListCountryDto.keyword) {
      where.name = Like(`%${reqListCountryDto.keyword}%`);
    }
    return this.countryRepository.find({
      where,
    });
  }

  /* 通过国家简称查询 */
  findByCountryName(name) {
    return this.countryRepository.findOneBy({ name });
  }

  /* 更新国家信息 */
  update(reqUpdateCountryDto: ReqUpdateCountryDto) {
    return this.countryRepository.update(
      reqUpdateCountryDto.id,
      reqUpdateCountryDto,
    );
  }

  /* 删除国家 */
  delete(ids: string) {
    return this.countryRepository.delete(ids.split(','));
  }

  /* 查询所有国家引导 */
  levels() {
    return this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndMapMany(
        'country.children',
        Level,
        'level',
        'country.id = level.countryId',
      )
      .select('country.id')
      .addSelect('country.name')
      .addSelect('level.id')
      .addSelect('level.level')
      .getMany();
  }
}
