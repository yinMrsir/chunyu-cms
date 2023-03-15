import { IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Level } from '../../../basic/level/entities/level.entity';

@Entity()
export class MovieLevel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'movie_id',
    comment: '关联的影视id',
  })
  @IsNumber()
  movieId: number;

  @Column('int', {
    name: 'level_id',
    comment: '关联的引导等级id',
  })
  @IsNumber()
  levelId: number;
}
