import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateCastDto } from './create-cast.dto';

export class UpdateCastDto extends PartialType(CreateCastDto) {
  @IsNumber()
  id: number;
}
