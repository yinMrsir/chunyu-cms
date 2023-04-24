import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity({ name: 'basic_banner' })
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', comment: '图片' })
  @IsString()
  img: string;

  @Column({ type: 'varchar', comment: '标题' })
  @IsString()
  title: string;

  @Column({ type: 'varchar', comment: '链接', nullable: true })
  @IsOptional()
  url: string;

  @Column({
    type: 'varchar',
    comment: '链接类型 0: 站内 1: 站外',
    default: '0',
  })
  @IsString()
  urlType: string;
}
