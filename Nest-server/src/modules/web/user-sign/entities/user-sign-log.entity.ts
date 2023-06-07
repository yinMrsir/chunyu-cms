import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('user_sign_log')
export class UserSignLog extends BaseEntity {
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
  userId: number;

  @Column('text', {
    name: 'sign_reward',
    comment: '签到奖励内容',
  })
  signReward: string;

  @CreateDateColumn({
    name: 'sign_time',
    comment: '签到时间',
  })
  signTime: Date | string;

  @Column('varchar', {
    name: 'sign_type',
    comment: '签到类型 1=签到 2=补签',
    default: '1',
  })
  signType: string;
}
