import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRateDto } from './dto/create-user-rate.dto';
import { UserRate } from './entities/user-rate.entity';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';

@Injectable()
export class UserRateService {
  constructor(
    @InjectRepository(UserRate)
    private readonly userRateRepository: Repository<UserRate>,
    @InjectRepository(MovieBasic)
    private readonly movieBasicRepository: Repository<MovieBasic>,
  ) {}

  async create(createUserRateDto: CreateUserRateDto) {
    const movieBasic = await this.movieBasicRepository.findOne({
      where: {
        id: createUserRateDto.movieId,
      },
      select: ['rate', 'rateUserCount'],
    });
    const rateUserCount = movieBasic.rateUserCount + 1;
    const rate = (movieBasic.rate + createUserRateDto.rate * 2) / rateUserCount;
    await this.movieBasicRepository.update(createUserRateDto.movieId, {
      rate,
      rateUserCount,
    });
    return this.userRateRepository.save(createUserRateDto);
  }

  findOne(userId: number, movieId: number) {
    return this.userRateRepository.findOneBy({ userId, movieId });
  }
}
