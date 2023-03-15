import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  ReqCreatePhotosMovieDto,
  ReqListPhotosMovieDto,
} from './dto/req-photos-movie.dto';
import { PhotosMovie } from './entities/photos-movie.entity';

@Injectable()
export class PhotosMovieService {
  constructor(
    @InjectRepository(PhotosMovie)
    private readonly photosMovieRepository: Repository<PhotosMovie>,
  ) {}

  create(reqCreatePhotosMovieDto: ReqCreatePhotosMovieDto) {
    return this.photosMovieRepository.save(reqCreatePhotosMovieDto);
  }

  async findPageAll(reqListPhotosMovieDto: ReqListPhotosMovieDto) {
    const where: FindOptionsWhere<PhotosMovie> = { delFlag: '0' };
    if (reqListPhotosMovieDto.movieId) {
      where.movieId = reqListPhotosMovieDto.movieId;
    }
    if (reqListPhotosMovieDto.type) {
      where.type = reqListPhotosMovieDto.type;
    }
    if (reqListPhotosMovieDto.status) {
      where.status = reqListPhotosMovieDto.status;
    }
    const [rows, total] = await this.photosMovieRepository.findAndCount({
      skip: reqListPhotosMovieDto.skip,
      take: reqListPhotosMovieDto.take,
      where,
    });
    return {
      rows,
      total,
    };
  }

  delete(id, remark: string) {
    return this.photosMovieRepository.update(id, { delFlag: '2', remark });
  }
}
