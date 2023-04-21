import { IsString, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'columns' })
export class Columns extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 50, comment: '栏目名称' })
  @IsString()
  name: string;

  @Column('varchar', { length: 1, comment: '栏目类型', default: '1' })
  @IsString()
  type: string;

  @Column('varchar', { length: 50, comment: '目录名' })
  @IsString()
  value: string;

  @Column('int', { comment: '排序', default: 1 })
  @IsOptional()
  order: number;

  @Column('varchar', { length: 50, comment: '状态', default: '0' })
  @IsOptional()
  status: string;
}
