
import {IsNotEmpty, IsOptional } from 'class-validator';

export class QueryPubDateDto {
  @IsNotEmpty({ message: '影视ID不能为空' })
  @IsOptional()
  movieId: number;
}
