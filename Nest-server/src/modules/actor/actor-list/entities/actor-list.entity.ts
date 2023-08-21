import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity({ name: 'actor' })
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { comment: '封面', default: '' })
  @IsOptional()
  avatar: string;

  @Column('varchar', { comment: '中文名' })
  @IsNotEmpty({ message: '中文名不能为空' })
  @IsString()
  name: string;

  @Column('varchar', { name: 'name_en', comment: '英文名', default: '' })
  @IsOptional()
  nameEn: string;

  @Column('varchar', { name: 'name_more', comment: '中文别名', default: '' })
  @IsOptional()
  nameMore: string;

  @Column('varchar', { name: 'name_en_more', comment: '英文别名', default: '' })
  @IsOptional()
  nameEnMore: string;

  @Column('varchar', { comment: '性别', default: 3 })
  @IsOptional()
  gender: string;

  @Column('date', { name: 'birthday', comment: '出生日期', default: null })
  @IsOptional()
  birthday: Date | string;

  @Column('date', { name: 'death_day', comment: '逝世日期', default: null })
  @IsOptional()
  deathDay: Date | string;

  @Column('int', { name: 'country_id', comment: '国家id', default: null })
  @IsOptional()
  countryId: number;

  @Column('varchar', { name: 'born_place', comment: '出生地址', default: '' })
  @IsOptional()
  bornPlace: string;

  @Column('text', { name: 'brief', comment: '简介' })
  @IsOptional()
  brief: string;
}
