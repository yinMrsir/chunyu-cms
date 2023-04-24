import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { MovieBasic } from './movie-basic.entity';

@Entity('movie_pv')
export class MoviePv extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('integer', {
    name: 'pv',
    comment: '访问量',
    default: 0,
  })
  pv: number;

  @OneToOne(() => MovieBasic, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: MovieBasic;
}
