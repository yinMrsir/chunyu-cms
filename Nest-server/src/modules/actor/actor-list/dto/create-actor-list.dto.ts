import { Actor } from '../entities/actor-list.entity';
import { IsOptional } from 'class-validator';

export class CreateActorListDto extends Actor {
  @IsOptional()
  countryId: number;
}
