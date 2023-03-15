import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('basic_language')
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50, comment: '中文简称' })
  @IsString()
  name: string;

  @Column('varchar', {
    name: 'fullname',
    nullable: true,
    comment: '中文全称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  fullname: string | null;

  @Column('int', {
    name: 'country_id',
    nullable: true,
    comment: '所属国家',
  })
  @IsOptional()
  @IsNumber()
  countryId?: number | null;

  @Column('varchar', {
    name: 'name_en',
    nullable: true,
    comment: '英文简称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  nameEn: string | null;

  @Column('varchar', {
    name: 'fullname_en',
    nullable: true,
    comment: '英文全称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  fullnameEn: string | null;

  @Column('varchar', {
    name: 'original_name',
    nullable: true,
    comment: '原名简称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  originalName: string | null;

  @Column('varchar', {
    name: 'original_fullname',
    nullable: true,
    comment: '原名全称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  originalFullname: string | null;

  @Column('varchar', {
    name: 'brief',
    nullable: true,
    comment: '简介',
    length: 500,
  })
  @IsOptional()
  @IsString()
  brief: string | null;
}
