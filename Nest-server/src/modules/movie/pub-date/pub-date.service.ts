import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePubDateDto } from './dto/create-pub-date.dto';
import { UpdatePubDateDto } from './dto/update-pub-date.dto';
import { PubDate } from './entities/pub-date.entity';
import { Country } from '../../basic/country/entities/country.entity';
import { QueryPubDateDto } from './dto/query-pub-date.dto';

@Injectable()
export class PubDateService {
  constructor(
    @InjectRepository(PubDate)
    private readonly pubDateRepository: Repository<PubDate>,
  ) {}

  create(createPubDateDto: CreatePubDateDto) {
    return this.pubDateRepository.save(createPubDateDto);
  }

  async findPageList(queryPubDateDto: QueryPubDateDto) {
    const [rows, total] = await this.pubDateRepository
      .createQueryBuilder('pubDate')
      .leftJoinAndMapOne(
        'pubDate.country',
        Country,
        'country',
        'pubDate.countryId = country.id',
      )
      .where('pubDate.movieId = :movieId', { movieId: queryPubDateDto.movieId })
      .getManyAndCount();
    return {
      rows,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pubDate`;
  }

  update(updatePubDateDto: UpdatePubDateDto) {
    return this.pubDateRepository.update(updatePubDateDto.id, updatePubDateDto);
  }

  delete(ids: string) {
    return this.pubDateRepository.delete(ids.split(','));
  }

  // 根据movieId删除数据
  removeByMovieId(movieId) {
    return this.pubDateRepository.delete({
      movieId,
    });
  }
}
