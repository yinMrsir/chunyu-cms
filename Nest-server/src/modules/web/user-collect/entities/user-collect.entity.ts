import { Entity, PrimaryColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity({ name: 'user_collect' })
export class UserCollect {
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
}
