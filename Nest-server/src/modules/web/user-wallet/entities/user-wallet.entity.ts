import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { IsNumber } from 'class-validator';

@Entity('user_wallet')
export class UserWallet extends BaseEntity {
  @PrimaryColumn({
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
}
