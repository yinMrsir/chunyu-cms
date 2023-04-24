import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ReqLinkDto } from './dto/req-link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  /* 新增 */
  create(createLinkDto: CreateLinkDto) {
    return this.linkRepository.save(createLinkDto);
  }

  /* 分页查询 */
  findPageList(reqListDot: ReqLinkDto) {
    return this.linkRepository.findAndCount({
      skip: reqListDot.skip,
      take: reqListDot.take,
    });
  }

  /* 查询所有 */
  findAllList() {
    return this.linkRepository.find();
  }

  /* 根据条件查询单个 */
  findByOne(where: FindOptionsWhere<Link>) {
    return this.linkRepository.findOneBy(where);
  }

  /* 修改 */
  update(updateLinkDto: UpdateLinkDto) {
    return this.linkRepository.update(updateLinkDto.id, updateLinkDto);
  }

  /* 删除 */
  remove(id: number) {
    return this.linkRepository.delete(id);
  }
}
