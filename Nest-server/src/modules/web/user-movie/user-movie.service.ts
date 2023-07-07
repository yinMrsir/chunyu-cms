import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMovie } from './entities/user-movie.entity';
import { UserMovieLog } from './entities/user-movie-log.entity';

@Injectable()
export class UserMovieService {
  constructor(
    @InjectRepository(UserMovie)
    private readonly userMovieRepository: Repository<UserMovie>,
    @InjectRepository(UserMovieLog)
    private readonly userWalletLogRepository: Repository<UserMovieLog>,
  ) {}

  create(userId: number, movieId: number) {
    return this.userMovieRepository.save({ userId, movieId });
  }

  findUserMovie(userId: number, movieId: number): Promise<UserMovie> {
    return this.userMovieRepository.findOneBy({
      userId,
      movieId,
    });
  }
}
