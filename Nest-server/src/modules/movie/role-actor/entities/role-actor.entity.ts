import { IsOptional, IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('movie_role_actor')
export class RoleActor extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'movie_id', comment: '关联的影视id' })
  @IsNumber()
  movieId: number;

  @Column('int', { comment: '关联的角色id' })
  @IsNumber()
  roleId: number;

  @Column('int', { comment: '关联的演员id', nullable: true })
  @IsOptional()
  actorId: number;

  @Column('varchar', { comment: '封面', nullable: true })
  @IsOptional()
  avatar?: string | null;

  @Column('varchar', { name: 'brief', comment: '简介', default: '' })
  @IsOptional()
  brief: string;
}
