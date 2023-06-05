import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSignDto } from './create-user-sign.dto';

export class UpdateUserSignDto extends PartialType(CreateUserSignDto) {}
