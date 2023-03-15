import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieRoleDto } from './dto/create-movie-role.dto';
import { UpdateMovieRoleDto } from './dto/update-movie-role.dto';
import { MovieRole } from './entities/movie-role.entity';
import {
  QueryAllMovieRoleDto,
  QueryMovieRoleDto,
} from './dto/query-movie-role.dto';

@Injectable()
export class MovieRoleService {
  constructor(
    @InjectRepository(MovieRole)
    private readonly movieRoleRepository: Repository<MovieRole>,
  ) {}

  create(createMovieRoleDto: CreateMovieRoleDto) {
    return this.movieRoleRepository.save(createMovieRoleDto);
  }

  async findPageList(queryMovieRoleDto: QueryMovieRoleDto) {
    const [rows, total] = await this.movieRoleRepository.findAndCount({
      skip: queryMovieRoleDto.skip,
      take: queryMovieRoleDto.take,
    });
    return { rows, total };
  }

  async findAll(queryAllMovieRoleDto: QueryAllMovieRoleDto) {
    const queryBuilder = this.movieRoleRepository
      .createQueryBuilder('movieRole')
      .select(['movieRole.id', 'movieRole.name', 'movieRole.avatar']);

    if (queryAllMovieRoleDto.keyword) {
      queryBuilder.where('movieRole.name like :name', {
        name: `%${queryAllMovieRoleDto.keyword}%`,
      });
    }

    const rows = await queryBuilder.getMany();
    return { rows };
  }

  update(updateMovieRoleDto: UpdateMovieRoleDto) {
    return this.movieRoleRepository.update(
      updateMovieRoleDto.id,
      updateMovieRoleDto,
    );
  }

  remove(ids: string) {
    return this.movieRoleRepository.delete(ids.split(','));
  }
}
