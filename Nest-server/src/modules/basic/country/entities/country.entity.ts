import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Actor } from '../../../actor/actor-list/entities/actor-list.entity';

@Entity({ name: 'basic_country' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', comment: '中文简称' })
  @IsString()
  name: string;

  @Column({ type: 'varchar', comment: '编码', default: '' })
  @IsOptional()
  @IsString()
  code?: string;

  @Column({ type: 'int', comment: '类型 0:国家 1：地区', default: 0 })
  @IsOptional()
  @IsNumber()
  type?: string;

  @Column({ type: 'varchar', comment: '中文全称', default: '' })
  @IsOptional()
  @IsString()
  fullname?: string;

  @Column({ type: 'varchar', comment: '所属大洲', default: '' })
  @IsOptional()
  @IsString()
  continent?: string;

  @Column({ type: 'varchar', comment: '英文简称', default: '' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @Column({ type: 'varchar', comment: '英文全称', default: '' })
  @IsOptional()
  @IsString()
  fullnameEn?: string;

  @Column({ type: 'varchar', comment: '原名简称', default: '' })
  @IsOptional()
  @IsString()
  originalName?: string;

  @Column({ type: 'varchar', comment: '原名全称', default: '' })
  @IsOptional()
  @IsString()
  originalFullname?: string;

  @Column({ type: 'varchar', comment: '成立日期', nullable: true })
  @IsOptional()
  @IsString()
  beginDate?: string;

  @Column({ type: 'varchar', comment: '消失日期', nullable: true })
  @IsOptional()
  @IsString()
  endDate?: string;

  @Column({ type: 'varchar', comment: '国旗/区旗', nullable: true })
  @IsOptional()
  @IsString()
  @IsString()
  flag?: string;

  @Column({ type: 'varchar', length: 500, comment: '简介', default: '' })
  @IsOptional()
  @IsString()
  brief?: string;
}
