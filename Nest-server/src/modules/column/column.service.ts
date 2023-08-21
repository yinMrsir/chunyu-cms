import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { QueryColumnDto } from './dto/query-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private readonly columnsRepository: Repository<Columns>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    await this.columnsRepository.save(createColumnDto);
  }

  async findPageList(queryColumnDto: QueryColumnDto) {
    const where: FindOptionsWhere<Columns> = {};
    if (queryColumnDto.type) {
      where.type = queryColumnDto.type;
    }
    if (queryColumnDto.status) {
      where.status = queryColumnDto.status;
    }
    const [rows, total] = await this.columnsRepository.findAndCount({
      where,
      take: queryColumnDto.take,
      skip: queryColumnDto.skip,
    });
    return {
      rows,
      total,
    };
  }

  async findAll(queryColumnDto: QueryColumnDto) {
    const where: FindOptionsWhere<Columns> = {};
    if (queryColumnDto.type) {
      where.type = queryColumnDto.type;
    }
    if (queryColumnDto.status) {
      where.status = queryColumnDto.status;
    }
    return this.columnsRepository.findBy(where);
  }

  findOne(where: FindOptionsWhere<Columns>) {
    return this.columnsRepository.findOneBy(where);
  }

  update(updateColumnDto: UpdateColumnDto) {
    return this.columnsRepository.update(updateColumnDto.id, updateColumnDto);
  }

  remove(ids: string) {
    return this.columnsRepository.delete(ids.split(','));
  }
}
