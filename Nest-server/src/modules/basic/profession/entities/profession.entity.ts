import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { MovieBasic } from '../../../movie/basic/entities/movie-basic.entity';
import { Cast } from '../../../movie/cast/entities/cast.entity';

@Entity('basic_profession')
@Tree('materialized-path')
export class Profession extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @IsOptional()
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '中文名称',
    length: 5,
  })
  @IsString()
  name: string | null;

  @Column('varchar', {
    name: 'name_en',
    nullable: true,
    comment: '英文简称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  nameEn: string | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment: '状态',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  status: number | null;

  @Column('varchar', {
    name: 'brief',
    nullable: true,
    comment: '简介',
    length: 500,
  })
  @IsOptional()
  @IsString()
  brief: string | null;

  @TreeChildren()
  children: Profession[];

  @ApiHideProperty()
  @TreeParent()
  parent: Profession;
}
