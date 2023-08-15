import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRateDto } from './dto/create-user-rate.dto';
import { UserRate } from './entities/user-rate.entity';
import { MovieRate } from '../../movie/basic/entities/movie-rate.entity';

@Injectable()
export class UserRateService {
  constructor(
    @InjectRepository(UserRate)
    private readonly userRateRepository: Repository<UserRate>,
    @InjectRepository(MovieRate)
    private readonly movieRateRepository: Repository<MovieRate>,
  ) {}

  async create(createUserRateDto: CreateUserRateDto) {
    const movieRate = await this.movieRateRepository.findOne({
      where: {
        movie: {
          id: createUserRateDto.movieId,
        },
      },
    });
    if (movieRate === null) {
      const rate = createUserRateDto.rate * 2;
      await this.movieRateRepository.save({
        movie: {
          id: createUserRateDto.movieId,
        },
        rate,
        rateUserCount: 1,
      });
      return this.userRateRepository.save({
        userId: createUserRateDto.userId,
        movieId: createUserRateDto.movieId,
        rate,
      });
    } else {
      const rateUserCount = movieRate.rateUserCount + 1;
      const rate =
        (movieRate.rate + createUserRateDto.rate * 2) / rateUserCount;
      await this.movieRateRepository.update(
        {
          movie: {
            id: createUserRateDto.movieId,
          },
        },
        {
          rate,
          rateUserCount,
        },
      );
      return this.userRateRepository.save({
        userId: createUserRateDto.userId,
        movieId: createUserRateDto.movieId,
        rate,
      });
    }
  }

  findOne(userId: number, movieId: number) {
    return this.userRateRepository.findOneBy({ userId, movieId });
  }
}
