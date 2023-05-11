import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity({ name: 'user_rate' })
export class UserRate {
  @PrimaryColumn({
    name: 'user_id',
    comment: '用户id',
  })
  @IsOptional()
  userId: number;

  @PrimaryColumn({
    name: 'movie_id',
    comment: '影视id',
  })
  @IsOptional()
  movieId: number;

  @Column('int', {
    name: 'rate',
    comment: '评分',
  })
  @IsOptional()
  rate: number;
}
