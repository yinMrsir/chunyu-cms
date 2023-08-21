import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleActorService } from './role-actor.service';
import { CreateRoleActorDto } from './dto/create-role-actor.dto';
import { UpdateRoleActorDto } from './dto/update-role-actor.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { QueryRoleActorDto } from './dto/query-role-actor.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('movie/role-actor')
export class RoleActorController {
  constructor(private readonly roleActorService: RoleActorService) {}

  @Post()
  async create(
    @Body() createRoleActorDto: CreateRoleActorDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createRoleActorDto.createBy = createRoleActorDto.updateBy = userName;
    await this.roleActorService.create(createRoleActorDto);
  }

  @Public()
  @Get('list')
  list(@Query(PaginationPipe) queryRoleActorDto: QueryRoleActorDto) {
    return this.roleActorService.findPageList(queryRoleActorDto);
  }

  @Put()
  update(
    @Body() updateRoleActorDto: UpdateRoleActorDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateRoleActorDto.updateBy = userName;
    return this.roleActorService.update(updateRoleActorDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.roleActorService.remove(ids);
  }
}
