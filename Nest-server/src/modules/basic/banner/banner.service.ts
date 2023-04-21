import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  create(createBannerDto: CreateBannerDto) {
    return this.bannerRepository.save(createBannerDto);
  }

  async findPageList() {
    const [rows, total] = await this.bannerRepository.findAndCount({
      order: {
        createTime: 'DESC',
      },
    });
    return {
      rows,
      total,
    };
  }

  update(updateBannerDto: UpdateBannerDto) {
    return this.bannerRepository.update(updateBannerDto.id, updateBannerDto);
  }

  remove(ids: string) {
    return this.bannerRepository.delete(ids.split(','));
  }
}
