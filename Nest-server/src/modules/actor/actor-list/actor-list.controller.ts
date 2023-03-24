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
import { ActorListService } from './actor-list.service';
import { CreateActorListDto } from './dto/create-actor-list.dto';
import { UpdateActorListDto } from './dto/update-actor-list.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import {
  QueryActorAllDto,
  QueryActorListDto,
} from './dto/query-actor-list.dto';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';

@Controller('actor')
export class ActorListController {
  constructor(private readonly actorListService: ActorListService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() createActorListDto: CreateActorListDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createActorListDto.createBy = createActorListDto.updateBy = userName;
    await this.actorListService.create(createActorListDto);
  }

  @Get('list')
  list(@Query(PaginationPipe) queryActorListDto: QueryActorListDto) {
    return this.actorListService.findPageAll(queryActorListDto);
  }

  @Get('all')
  all(@Query() queryActorAllDto: QueryActorAllDto) {
    return this.actorListService.findAll(queryActorAllDto);
  }

  @RepeatSubmit()
  @Put()
  async update(
    @Body() updateActorListDto: UpdateActorListDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateActorListDto.updateBy = userName;
    await this.actorListService.update(updateActorListDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.actorListService.remove(ids);
  }
}
