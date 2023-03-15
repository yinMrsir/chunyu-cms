import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateMovieRoleDto } from './create-movie-role.dto';

export class UpdateMovieRoleDto extends PartialType(CreateMovieRoleDto) {
  @IsNumber()
  id: number;
}
