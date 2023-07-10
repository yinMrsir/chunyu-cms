import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCollectDto } from './dto/create-user-collect.dto';
import { UserCollect } from './entities/user-collect.entity';
import { DataObj } from '../../../common/class/data-obj.class';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';

@Injectable()
export class UserCollectService {
  constructor(
    @InjectRepository(UserCollect)
    private readonly userCollectRepository: Repository<UserCollect>,
  ) {}

  create(createUserCollectDto: CreateUserCollectDto) {
    return this.userCollectRepository.save(createUserCollectDto);
  }

  async findByPage(userCollectQuery) {
    const queryBuilder = this.userCollectRepository
      .createQueryBuilder('userCollect')
      .leftJoinAndMapOne(
        'userCollect.movie',
        MovieBasic,
        'movieBasic',
        'userCollect.movieId = movieBasic.id',
      )
      .where({ userId: userCollectQuery.userId })
      .take(userCollectQuery.take)
      .skip(userCollectQuery.skip);

    const [rows, total] = await queryBuilder.getManyAndCount();
    return {
      rows,
      total,
    };
  }

  findByMovieIdPage(movieId) {
    return movieId;
  }

  async findOne(userId: number, movieId: number) {
    const data = await this.userCollectRepository.findOneBy({
      userId,
      movieId,
    });
    return new DataObj(data);
  }

  remove(userId?: number, movieId?: number) {
    return this.userCollectRepository.delete({ userId, movieId });
  }

  removeByMovieId(movieId: number) {
    return this.userCollectRepository.delete({ movieId });
  }
}
