import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateVideoDto } from './create-video-list.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsNumber()
  id: number;
}
