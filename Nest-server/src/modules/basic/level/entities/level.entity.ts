import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('basic_level')
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @IsOptional()
  id: number;

  @Column('int', { name: 'country_id', nullable: true, comment: '国家Id' })
  @IsNumber()
  countryId: number | null;

  @Column('varchar', {
    name: 'level',
    nullable: true,
    comment: '家长引导',
    length: 10,
  })
  @IsOptional()
  @IsString()
  level: string | null;

  @Column('varchar', {
    name: 'level_zh',
    nullable: true,
    comment: '引导中文',
    length: 10,
  })
  @IsOptional()
  @IsString()
  levelZh: string | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment: '状态',
    default: 0,
  })
  @IsOptional()
  status: number | null;

  @Column('varchar', {
    name: 'descript',
    comment: '引导模板',
    length: 200,
  })
  @IsString()
  descript: string;
}
