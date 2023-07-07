import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { IsOptional } from 'class-validator';

@Entity('user_movie')
export class UserMovie extends BaseEntity {
  @PrimaryColumn({
    name: 'user_id',
    comment: '用户ID',
    select: false,
  })
  @IsOptional()
  userId: number;

  @Column({
    comment: '影视ID',
  })
  @IsOptional()
  movieId: number;
}
