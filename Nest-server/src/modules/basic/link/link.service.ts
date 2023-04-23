import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { ReqListDto } from './dto/req-list.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  create(createLinkDto: CreateLinkDto) {
    return this.linkRepository.save(createLinkDto);
  }

  findPageList(reqListDot: ReqListDto) {
    return this.linkRepository.findAndCount({
      skip: reqListDot.skip,
      take: reqListDot.take,
    });
  }

  findAllList() {
    return this.linkRepository.find();
  }

  update(updateLinkDto: UpdateLinkDto) {
    return this.linkRepository.update(updateLinkDto.id, updateLinkDto);
  }

  remove(id: number) {
    return this.linkRepository.delete(id);
  }
}
