import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorListDto } from './dto/create-actor-list.dto';
import { UpdateActorListDto } from './dto/update-actor-list.dto';
import { Actor } from './entities/actor-list.entity';
import { Country } from '../../basic/country/entities/country.entity';
import {
  QueryActorAllDto,
  QueryActorListDto,
} from './dto/query-actor-list.dto';

@Injectable()
export class ActorListService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  // 新增
  create(createActorListDto: CreateActorListDto) {
    return this.actorRepository.save(createActorListDto);
  }

  // 查询所有分页
  async findPageAll(queryActorListDto: QueryActorListDto) {
    const queryBuilder = this.actorRepository
      .createQueryBuilder('actor')
      .leftJoinAndMapOne(
        'actor.country',
        Country,
        'country',
        'actor.countryId = country.id',
      )
      .orderBy('actor.createTime', 'DESC')
      .skip(queryActorListDto.skip)
      .take(queryActorListDto.take);

    if (queryActorListDto.name) {
      queryBuilder.where('actor.name like :name', {
        name: `%${queryActorListDto.name}%`,
      });
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return {
      rows,
      total,
    };
  }

  // 查询所有不分页
  async findAll(queryActorAllDto: QueryActorAllDto) {
    const queryBuilder = this.actorRepository
      .createQueryBuilder('actor')
      .select(['actor.id', 'actor.name', 'actor.avatar']);
    if (queryActorAllDto.keyword) {
      queryBuilder.where('actor.name like :name', {
        name: `%${queryActorAllDto.keyword}%`,
      });
    }
    const rows = await queryBuilder.getMany();
    return { rows };
  }

  // 更新
  update(updateActorListDto: UpdateActorListDto) {
    return this.actorRepository.update(
      updateActorListDto.id,
      updateActorListDto,
    );
  }

  // 删除
  remove(ids: string) {
    return this.actorRepository.delete(ids.split(','));
  }
}
