import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsNumber()
  id: number;
}
