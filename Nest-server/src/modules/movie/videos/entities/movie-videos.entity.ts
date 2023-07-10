import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { MovieBasic } from '../../basic/entities/movie-basic.entity';
import { Video } from '../../../video/video-list/entities/video.entity';

@Entity('movie_videos')
export class MovieVideos extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'movie_id',
    comment: '关联的影视id',
  })
  @IsNumber()
  @ManyToOne(() => MovieBasic)
  @JoinColumn({ name: 'movie_id' })
  movieId: number;

  @Column('varchar', {
    name: 'type_id',
    comment: '分类Id',
  })
  @IsString()
  typeId: string;

  @Column('varchar', {
    name: 'title',
    comment: '标题',
    length: 200,
  })
  @IsOptional()
  title: string;

  @Column('int', {
    comment: '关联的视频',
  })
  @IsNumber()
  videoId: number;

  @ManyToOne(() => Video, { nullable: true })
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @Column('varchar', {
    name: 'cover',
    comment: '封面',
    default: '',
  })
  @IsOptional()
  cover: string;

  @Column('int', {
    name: 'sort',
    comment: '排序',
    default: 1,
  })
  @IsNumber()
  sort: number;

  @Column('varchar', {
    name: 'status',
    comment: '状态',
    default: '0',
  })
  @IsOptional()
  status: string;
}
