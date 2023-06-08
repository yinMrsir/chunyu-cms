import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('user_wallet_log')
export class UserWalletLog extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'ID',
  })
  @Type()
  @IsOptional()
  id: number;

  @Column({
    name: 'user_id',
    comment: '用户ID',
    select: false,
  })
  @IsNumber()
  userId: number;

  @Column({
    comment: '金币',
    default: 0,
  })
  @IsNumber()
  gold: number;

  @Column({
    comment: '类型 1: 新增  2: 扣除',
    default: '1',
  })
  type: string;
}
