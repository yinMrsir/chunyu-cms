import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity()
export class MovieRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({
    comment: '封面',
    default: '',
  })
  @IsOptional()
  avatar?: string;

  @Column({
    comment: '角色名',
  })
  @IsString()
  name: string;

  @Column({
    comment: '别名',
    default: '',
  })
  @IsOptional()
  akas?: string;

  @Column('varchar', {
    comment: '类型',
    length: 2,
  })
  @IsString()
  type: string;

  @Column({
    name: 'name_en',
    comment: '外文名',
    default: '',
  })
  @IsOptional()
  nameEn: string;

  @Column('varchar', {
    comment: '性别',
    default: '3',
    length: 1,
  })
  @IsOptional()
  sex: string;

  @Column({
    comment: '年龄',
    default: '',
  })
  @IsOptional()
  age: string;

  @Column({
    comment: '血型',
    default: '',
  })
  @IsOptional()
  blood: string;

  @Column({
    comment: '身高',
    default: '',
  })
  @IsOptional()
  height: string;

  @Column({
    comment: '体重',
    default: '',
  })
  @IsOptional()
  weight: string;

  @Column({
    comment: '标签',
    default: '',
  })
  @IsOptional()
  tags: string;

  @Column('text', {
    comment: '简介',
    nullable: true,
  })
  @IsOptional()
  brief: string;
}
