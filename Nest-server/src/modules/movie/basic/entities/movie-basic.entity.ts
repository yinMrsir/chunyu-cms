import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { MovieVideos } from '../../videos/entities/movie-videos.entity';
import { MoviePv } from './movie-pv.entity';
import { UserCollect } from '../../../web/user-collect/entities/user-collect.entity';
import { MovieRate } from './movie-rate.entity';

@Entity('movie_basic')
export class MovieBasic extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'status',
    comment: '状态： -9: 处理中 -8: 待完善 -7: 待审核 -1: 隐藏 0: 正常 1: 锁定',
    default: () => "'0'",
  })
  @IsOptional()
  status: number;

  @Column('int', {
    name: 'release_status',
    comment: '上映状态: 0: 无 1: 即将上映 2: 正在热映',
    default: () => "'0'",
  })
  @IsOptional()
  releaseStatus: number;

  @Column('varchar', {
    name: 'release_date',
    nullable: true,
    comment: '上映日期',
  })
  @IsOptional()
  releaseDate: string | null;

  @Column('varchar', { name: 'title', comment: '中文名', length: 50 })
  @IsString()
  title: string;

  @Column('varchar', {
    name: 'poster',
    nullable: true,
    comment: '海报',
    length: 300,
  })
  @IsOptional()
  poster: string | null;

  @Column('varchar', {
    name: 'bg_color',
    nullable: true,
    comment: '背景色',
    length: 100,
  })
  @IsOptional()
  bgColor: string | null;

  @Column('varchar', {
    name: 'title_en',
    nullable: true,
    comment: '英文名',
    length: 100,
  })
  @IsOptional()
  titleEn: string | null;

  @Column('varchar', {
    name: 'title_original',
    nullable: true,
    comment: '影视原名',
    length: 100,
  })
  @IsOptional()
  titleOriginal: string | null;

  @Column('varchar', {
    name: 'akas',
    nullable: true,
    comment: '别名',
    length: 100,
  })
  @IsOptional()
  akas: string | null;

  @Column('varchar', {
    name: 'column_value',
    comment: '影视分类',
  })
  @IsOptional()
  @IsString()
  columnValue: string;

  @Column('varchar', {
    name: 'genres',
    nullable: true,
    comment: '所属类型',
    length: 100,
  })
  @IsOptional()
  @IsString()
  genres: string | null;

  @Column('int', {
    name: 'year',
    nullable: true,
    comment: '年代',
  })
  @IsOptional()
  @IsNumber()
  year: number | null;

  @Column('datetime', {
    name: 'pubdate',
    nullable: true,
    comment: '首映时间',
  })
  @IsOptional()
  pubdate: Date | null;

  @Column('varchar', {
    name: 'duration',
    nullable: true,
    comment: '上映版片长',
    length: 100,
  })
  @IsOptional()
  @IsString()
  duration: string | null;

  @Column('varchar', {
    name: 'durations',
    nullable: true,
    comment: '片长',
    length: 100,
  })
  @IsOptional()
  @IsString()
  durations: string | null;

  @Column('varchar', {
    name: 'versions',
    nullable: true,
    comment: '银幕',
    length: 100,
  })
  @IsOptional()
  @IsString()
  versions: string | null;

  @Column('int', {
    name: 'egg_hunt',
    nullable: true,
    comment: '彩蛋个数',
  })
  @IsOptional()
  @IsNumber()
  eggHunt: number;

  @Column('int', {
    name: 'color',
    nullable: true,
    comment: '色彩 0: 彩色  1：黑白',
  })
  @IsOptional()
  @IsNumber()
  color: number;

  @Column('int', {
    name: 'season_count',
    nullable: true,
    comment: '总季数',
  })
  @IsOptional()
  @IsNumber()
  seasonCount: number;

  @Column('int', {
    name: 'current_season',
    nullable: true,
    comment: '当前季',
  })
  @IsOptional()
  @IsNumber()
  currentSeason: number;

  @Column('int', {
    name: 'episode_count',
    nullable: true,
    comment: '总集数',
  })
  @IsOptional()
  @IsNumber()
  episodeCount: number;

  @Column('int', {
    name: 'current_episode',
    nullable: true,
    comment: '当前集数',
  })
  @IsOptional()
  @IsNumber()
  currentEpisode: number;

  @Column('int', {
    name: 'the_end',
    nullable: true,
    comment: '是否完结 0：否  1：是',
  })
  @IsOptional()
  @IsNumber()
  theEnd: number;

  @Column('varchar', {
    name: 'country_ids',
    nullable: true,
    comment: '国家/地区',
    length: 100,
  })
  @IsOptional()
  @IsString()
  countryIds: string | null;

  @Column('varchar', {
    name: 'languages',
    nullable: true,
    comment: '语言',
    length: 100,
  })
  @IsOptional()
  @IsString()
  languages: string | null;

  @Column('varchar', {
    name: 'tags',
    nullable: true,
    comment: '标签',
    length: 100,
  })
  @IsOptional()
  @IsString()
  tags: string | null;

  @Column('varchar', {
    name: 'summary',
    nullable: true,
    comment: '简介',
    length: 1000,
  })
  @IsOptional()
  @IsString()
  summary: string | null;

  @Column('int', {
    name: 'is_pay',
    comment: '是否付费',
    default: 0,
  })
  @IsOptional()
  isPay: number;

  @Column('int', {
    name: 'payment_amount',
    comment: '支付金币',
    default: 0,
  })
  @IsOptional()
  paymentAmount: number;

  @Column('int', {
    name: 'free_duration',
    comment: '免费时长(分钟)',
    default: 1,
  })
  @IsOptional()
  freeDuration: number;

  // 关联的视频
  @OneToMany(() => MovieVideos, (movieVideos) => movieVideos.movieId)
  movieVideos: MovieVideos[];

  // 访问量
  @OneToOne(() => MoviePv, (moviePv) => moviePv.movie, { cascade: true })
  moviePv: MoviePv;

  // 访问量
  @OneToOne(() => MovieRate, (MovieRate) => MovieRate.movie, { cascade: true })
  movieRate: MovieRate;

  // 关联的收藏
  @OneToMany(() => UserCollect, (userCollect) => userCollect.movieId)
  userCollects: UserCollect[];
}
