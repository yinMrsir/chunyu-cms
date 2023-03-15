import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleActorDto } from './dto/create-role-actor.dto';
import { UpdateRoleActorDto } from './dto/update-role-actor.dto';
import { RoleActor } from './entities/role-actor.entity';
import { QueryMovieRoleDto } from '../../role/movie-role/dto/query-movie-role.dto';
import { QueryRoleActorDto } from './dto/query-role-actor.dto';
import { MovieRole } from '../../role/movie-role/entities/movie-role.entity';
import { Actor } from '../../actor/actor-list/entities/actor-list.entity';

@Injectable()
export class RoleActorService {
  constructor(
    @InjectRepository(RoleActor)
    private readonly roleActorRepository: Repository<RoleActor>,
  ) {}

  create(createRoleActorDto: CreateRoleActorDto) {
    return this.roleActorRepository.save(createRoleActorDto);
  }

  async findPageList(queryRoleActorDto: QueryRoleActorDto) {
    const queryBuilder = this.roleActorRepository
      .createQueryBuilder('roleActor')
      .leftJoinAndMapOne(
        'roleActor.role',
        MovieRole,
        'movieRole',
        'roleActor.roleId = movieRole.id',
      )
      .leftJoinAndMapOne(
        'roleActor.actor',
        Actor,
        'actor',
        'roleActor.actorId = actor.id',
      );

    if (queryRoleActorDto.movieId) {
      queryBuilder.where('roleActor.movieId = :movieId', {
        movieId: queryRoleActorDto.movieId,
      });
    }
    const [rows, total] = await queryBuilder.getManyAndCount();
    return { rows, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} roleActor`;
  }

  update(updateRoleActorDto: UpdateRoleActorDto) {
    return this.roleActorRepository.update(
      updateRoleActorDto.id,
      updateRoleActorDto,
    );
  }

  remove(ids: string) {
    return this.roleActorRepository.delete(ids.split(','));
  }

  // 根据movieId删除数据
  removeByMovieId(movieId) {
    return this.roleActorRepository.delete({
      movieId,
    });
  }
}
