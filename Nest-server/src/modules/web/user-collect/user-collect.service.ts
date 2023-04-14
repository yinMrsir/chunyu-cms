import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCollectDto } from './dto/create-user-collect.dto';
import { UpdateUserCollectDto } from './dto/update-user-collect.dto';
import { UserCollect } from './entities/user-collect.entity';

@Injectable()
export class UserCollectService {
  constructor(
    @InjectRepository(UserCollect)
    private readonly userCollectRepository: Repository<UserCollect>,
  ) {}

  create(createUserCollectDto: CreateUserCollectDto) {
    return this.userCollectRepository.create(createUserCollectDto);
  }

  async findByPage(userId) {
    const [rows, total] = await this.userCollectRepository.findAndCountBy({
      userId,
    });
    return {
      rows,
      total,
    };
  }

  findByMovieIdPage(movieId) {
    return `This action returns all userCollect`;
  }

  findOne(userId: number, movieId: number) {
    return this.userCollectRepository.findOneBy({
      userId,
      movieId,
    });
  }

  update(id: number, updateUserCollectDto: UpdateUserCollectDto) {
    return `This action updates a #${id} userCollect`;
  }

  remove(userId: number, movieId: number) {
    return `This action removes a #${userId} userCollect`;
  }
}
