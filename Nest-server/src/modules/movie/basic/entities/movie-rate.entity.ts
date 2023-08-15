import { BaseEntity } from '../../../../common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { MovieBasic } from './movie-basic.entity';

@Entity('movie_rate')
export class MovieRate extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'rate',
    default: 0,
    comment: '评分',
  })
  @IsOptional()
  rate: number;

  @Column('int', {
    name: 'rate_user_count',
    default: 0,
    comment: '评分人数',
  })
  @IsOptional()
  rateUserCount: number;

  @OneToOne(() => MovieBasic, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: MovieBasic;
}
