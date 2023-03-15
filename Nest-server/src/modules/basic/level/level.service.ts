import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReqCreateLevelDto,
  ReqListLevelDto,
  ReqUpdateLevelDto,
} from './dto/req-level.dto';
import { Level } from './entities/level.entity';
import { Country } from '../country/entities/country.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: ReqCreateLevelDto) {
    await this.levelRepository.save(createLevelDto);
  }

  /* 分页查询家长引导 */
  async findPageAll(reqListLevelDto: ReqListLevelDto) {
    const [rows, total] = await this.levelRepository
      .createQueryBuilder('level')
      .leftJoinAndMapOne(
        'level.country',
        Country,
        'country',
        'level.countryId = country.id',
      )
      .skip(reqListLevelDto.skip)
      .take(reqListLevelDto.take)
      .getManyAndCount();
    return { rows, total };
  }

  /* 不分页查询所有家长引导 */
  findAll() {
    return this.levelRepository.find();
  }

  /* 根据条件查询家长引导 */
  findOne(where: ReqUpdateLevelDto) {
    return this.levelRepository.findOneBy(where);
  }

  /* 修改家长引导 */
  update(updateLevelDto: ReqUpdateLevelDto) {
    return this.levelRepository.update(updateLevelDto.id, updateLevelDto);
  }

  /* 删除家长引导 */
  remove(id: number) {
    return this.levelRepository.delete(id);
  }
}
