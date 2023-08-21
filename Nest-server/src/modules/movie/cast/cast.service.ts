import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Cast } from './entities/cast.entity';
import { QueryCastDto } from './dto/query-cast.dto';
import { Actor } from '../../actor/actor-list/entities/actor-list.entity';
import { Profession } from '../../basic/profession/entities/profession.entity';
import { Country } from '../../basic/country/entities/country.entity';

@Injectable()
export class CastService {
  constructor(
    @InjectRepository(Cast)
    private readonly castRepository: Repository<Cast>,
  ) {}

  create(createCastDto: CreateCastDto) {
    return this.castRepository.save(createCastDto);
  }

  async findPageList(queryCastDto: QueryCastDto) {
    const queryBuilder = this.castRepository
      .createQueryBuilder('cast')
      .where('cast.movieId = :movieId', { movieId: queryCastDto.movieId })
      .leftJoinAndMapOne(
        'cast.actor',
        Actor,
        'actor',
        'cast.actorId = actor.id',
      )
      .leftJoinAndMapOne(
        'cast.country',
        Country,
        'country',
        'actor.countryId = country.id',
      )
      .leftJoinAndMapOne(
        'cast.professionId',
        Profession,
        'profession',
        'cast.professionId = profession.id',
      )
      .select('cast.id', 'id')
      .addSelect('cast.role', 'role')
      .addSelect('actor.id', 'actorId')
      .addSelect('actor.avatar', 'actorAvatar')
      .addSelect('actor.name', 'actorName')
      .addSelect('actor.gender', 'actorGender')
      .addSelect('actor.birthday', 'actorBirthday')
      .addSelect('country.name', 'countryName')
      .addSelect('profession.id', 'professionId')
      .addSelect('profession.name', 'professionName')
      .addSelect('profession.mpath', 'professionMpath');

    const [rows, total] = await Promise.all([
      queryBuilder.getRawMany(),
      queryBuilder.getCount(),
    ]);
    return {
      rows,
      total,
    };
  }

  update(updateCastDto: UpdateCastDto) {
    return this.castRepository.update(updateCastDto.id, updateCastDto);
  }

  remove(ids: string) {
    return this.castRepository.delete(ids.split(','));
  }

  // 根据movieId删除数据
  removeByMovieId(movieId) {
    return this.castRepository.delete({
      movieId,
    });
  }
}
