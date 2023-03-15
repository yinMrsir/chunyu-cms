import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('movie_cast')
export class Cast extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'movie_id',
    comment: '关联的影视id',
  })
  @IsNumber()
  movieId: number;

  @Column('int', {
    name: 'actor_id',
    comment: '关联的影人id',
  })
  @IsNumber()
  actorId: number;

  @Column('int', {
    name: 'profession_id',
    comment: '影人类型id',
  })
  @IsNumber()
  professionId: number;
}
