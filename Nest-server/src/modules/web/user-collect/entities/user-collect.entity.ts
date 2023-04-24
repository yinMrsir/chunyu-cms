import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsOptional } from 'class-validator';
import { MovieBasic } from '../../../movie/basic/entities/movie-basic.entity';
import { WebUser } from '../../user/entities/web-user.entity';

@Entity({ name: 'user_collect' })
export class UserCollect {
  @PrimaryColumn({
    name: 'user_id',
    comment: '用户id',
  })
  @IsOptional()
  @ManyToOne(() => WebUser)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({
    name: 'movie_id',
    comment: '影视id',
  })
  @IsOptional()
  @ManyToOne(() => MovieBasic)
  @JoinColumn({ name: 'movie_id' })
  movieId: number;
}
