import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReqCreateProfessionDto,
  ReqFindProfessionDto,
  ReqUpdateProfessionDto,
} from './dto/req-profession.dto';
import { Profession } from './entities/profession.entity';
import { ResFindNameProfessionDto } from './dto/res-profession.dto';
import { Cast } from '../../movie/cast/entities/cast.entity';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  /* 创建影人 */
  async create(reqCreateProfessionDto: ReqCreateProfessionDto) {
    if (reqCreateProfessionDto.parentId) {
      reqCreateProfessionDto.parent = await this.findById(
        reqCreateProfessionDto.parentId,
      );
    }
    await this.professionRepository.save(reqCreateProfessionDto);
  }

  /* 查询所有影人 */
  findAll() {
    return this.professionRepository
      .createQueryBuilder('profession')
      .select('cast(profession.id as char)', 'id')
      .addSelect('ifnull(profession.parentId, 0)', 'parentId')
      .addSelect('profession.name', 'name')
      .addSelect('profession.nameEn', 'nameEn')
      .addSelect('profession.status', 'status')
      .addSelect('profession.mpath', 'mpath')
      .addSelect('profession.brief', 'brief')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)')
          .from(Cast, 'cast')
          .where('cast.professionId = profession.id');
      }, 'movieCount')
      .getRawMany();
  }

  /* 根据Id查询影人 */
  findById(id: number) {
    return this.professionRepository.findOneBy({ id });
  }

  /* 根据条件查询影人 */
  findOne(where: ReqFindProfessionDto): Promise<ResFindNameProfessionDto> {
    const { parentId, ...params } = where;
    const queryBuilder = this.professionRepository
      .createQueryBuilder('profession')
      .select('profession.id', 'id')
      .addSelect('profession.parentId', 'parentId')
      .where(params);

    if (parentId) {
      queryBuilder.andWhere('profession.parentId = :id', { id: parentId });
    }
    return queryBuilder.getRawOne();
  }

  /* 更新影人 */
  async update(reqUpdateProfessionDto: ReqUpdateProfessionDto) {
    if (reqUpdateProfessionDto.parentId) {
      reqUpdateProfessionDto.parent = await this.findById(
        reqUpdateProfessionDto.parentId,
      );
    }
    delete reqUpdateProfessionDto.parentId;
    await this.professionRepository.update(
      reqUpdateProfessionDto.id,
      reqUpdateProfessionDto,
    );
  }

  /* 删除影人 */
  async remove(id: number) {
    await this.professionRepository.update(id, { parent: null });
    await this.professionRepository.delete(id);
  }
}
