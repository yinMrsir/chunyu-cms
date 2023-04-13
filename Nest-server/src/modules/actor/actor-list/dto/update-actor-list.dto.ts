import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateActorListDto } from './create-actor-list.dto';

export class UpdateActorListDto extends PartialType(CreateActorListDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
