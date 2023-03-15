

import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreatePubDateDto } from './create-pub-date.dto';

export class UpdatePubDateDto extends PartialType(CreatePubDateDto) {
  @IsNumber()
  id: number;
}
