import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCollectDto } from './create-user-collect.dto';

export class UpdateUserCollectDto extends PartialType(CreateUserCollectDto) {}
