import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('basic_genre')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'column_value' })
  @IsString()
  columnValue: string;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '中文名称',
    length: 50,
  })
  @IsString()
  name: string | null;

  @Column('varchar', {
    name: 'name_en',
    nullable: true,
    comment: '英文名称',
    length: 50,
  })
  @IsOptional()
  @IsString()
  nameEn: string | null;

  @Column('int', { name: 'status', default: 0 })
  @IsOptional()
  @IsNumber()
  status: number;
}
