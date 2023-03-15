import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
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

  async findPageList() {
    const [rows, total] = await this.columnsRepository.findAndCount();
    return {
      rows,
      total,
    };
  }

  async findAll() {
    return this.columnsRepository.find();
  }

  findOne(where) {
    return this.columnsRepository.findOneBy(where);
  }

  update(updateColumnDto: UpdateColumnDto) {
    return this.columnsRepository.update(updateColumnDto.id, updateColumnDto);
  }

  remove(ids: string) {
    return this.columnsRepository.delete(ids.split(','));
  }
}
