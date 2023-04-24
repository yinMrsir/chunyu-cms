import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity({ name: 'basic_link' })
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @IsOptional()
  id: number;

  @Column({
    name: 'text',
    comment: '链接文本',
  })
  @IsString()
  text: string;

  @Column({
    name: 'url',
    comment: '链接地址',
  })
  @IsString()
  url: string;
}
