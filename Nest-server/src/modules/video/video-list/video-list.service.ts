import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { CreateVideoDto } from './dto/create-video-list.dto';
import { UpdateVideoDto } from './dto/update-video-list.dto';
import { Video } from './entities/video.entity';
import { QueryVideoDto } from './dto/query-video-list.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoRepository.save(createVideoDto);
  }

  async findPageList(queryVideoDto: QueryVideoDto) {
    const queryBuilder = this.videoRepository
      .createQueryBuilder('video')
      .loadRelationCountAndMap('video.movieVideoCount', 'video.movieVideos')
      .take(queryVideoDto.take)
      .skip(queryVideoDto.skip)
      .orderBy('video.createTime', 'DESC');

    if (queryVideoDto.title) {
      queryBuilder.where({ title: Like(`%${queryVideoDto.title}%`) });
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return {
      rows,
      total,
    };
  }

  update(updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(updateVideoDto.id, updateVideoDto);
  }

  // 根据ids查询返回文件路径
  findByIds(ids) {
    return this.videoRepository.findByIds(ids.split(','));
  }

  remove(ids: string) {
    return this.videoRepository.delete(ids.split(','));
  }
}
