import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { MovieVideos } from '../../../movie/videos/entities/movie-videos.entity';

@Entity({ name: 'video' })
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { comment: '标题' })
  @IsString()
  title: string;

  @Column('varchar', { comment: '视频地址' })
  @IsString()
  url: string;

  @Column('longtext', { comment: '封面地址' })
  @IsString()
  poster: string;

  @Column('text', { comment: '视频文件名' })
  @IsString()
  name: string;

  @Column('text', { comment: '视频存放路径' })
  @IsString()
  path: string;

  @Column('int', { comment: '视频时长' })
  @IsNumber()
  duration: number;

  @Column('int', { comment: '视频高' })
  @IsNumber()
  height: number;

  @Column('int', { comment: '视频宽' })
  @IsNumber()
  width: number;

  @Column('int', { comment: '大小' })
  @IsNumber()
  size: number;

  @OneToMany(() => MovieVideos, (movieVideos) => movieVideos.video)
  movieVideos: MovieVideos[];
}
