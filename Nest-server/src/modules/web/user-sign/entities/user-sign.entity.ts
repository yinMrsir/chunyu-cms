import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';
import {IsNumber, IsOptional} from 'class-validator';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('user_sign')
export class UserSign extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'ID',
  })
  @Type()
  @IsOptional()
  id: number;

  @Column('int', {
    comment: '用户ID',
  })
  @IsNumber()
  userId: number;

  @Column('int', {
    name: 'series_days',
    comment: '累计签到天数',
    default: 0,
  })
  seriesDays: number;

  @Column('int', {
    name: 'continuity_days',
    comment: '连续签到天数',
    default: 0,
  })
  continuityDays: number;

  @Column('int', {
    name: 'sign_nums',
    comment: '可补签次数',
    default: 0,
  })
  signNums: number;
}
