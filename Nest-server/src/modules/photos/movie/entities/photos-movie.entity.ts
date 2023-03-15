import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('photos_movie')
export class PhotosMovie extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'movie_id',
    comment: '关联的影视id',
  })
  @IsNumber()
  movieId: number;

  @Column('varchar', {
    name: 'type',
    comment: '图片类型',
  })
  @IsString()
  type: string;

  @Column('varchar', {
    name: 'img',
    comment: '图片',
    length: 500,
  })
  @IsString()
  img: string;

  @Column('varchar', {
    name: 'status',
    comment: '审核状态',
    default: '1',
  })
  @IsOptional()
  status: string;

  @Column('int', {
    name: 'img_width',
    comment: '图片宽度',
    default: 0,
  })
  @IsNumber()
  imgWidth: number;

  @Column('int', {
    name: 'img_height',
    comment: '图片高度',
    default: 0,
  })
  @IsNumber()
  imgHeight: number;

  @Column('int', {
    name: 'img_size',
    comment: '图片大小',
    default: 0,
  })
  @IsNumber()
  imgSize: number;

  @ApiHideProperty()
  @Column({
    name: 'del_flag',
    comment: '删除标志（0代表存在 2代表删除）',
    type: 'char',
    length: 1,
    default: '0',
  })
  delFlag: string;
}
