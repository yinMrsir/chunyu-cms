import { IsOptional, IsNumber, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {BaseEntity} from "../../../../common/entities/base.entity";

@Entity('movie_pub_date')
export class PubDate extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', {
    name: 'pub_date',
    comment: '上映日期'
  })
  @IsOptional()
  pubDate: Date;

  @Column('int', {
    name: 'country_id',
    comment: '国家Id',
  })
  @IsNumber()
  countryId: number;

  @Column('varchar', {
    name: 'premiere',
    comment: '首映/重映',
    default: '1'
  })
  @IsOptional()
  premiere: string;

  @Column('int', {
    name: 'movie_id',
    comment: '关联的影视id',
  })
  @IsNotEmpty({ message: '关联的影视Id必传[movieId]' })
  @IsNumber()
  movieId: number;
}
