import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateRoleActorDto } from './create-role-actor.dto';

export class UpdateRoleActorDto extends PartialType(CreateRoleActorDto) {
  @IsNumber()
  id: number;
}
