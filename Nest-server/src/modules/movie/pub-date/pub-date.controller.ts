import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PubDateService } from './pub-date.service';
import { CreatePubDateDto } from './dto/create-pub-date.dto';
import { UpdatePubDateDto } from './dto/update-pub-date.dto';
import { User, UserEnum } from "../../../common/decorators/user.decorator";
import { UserInfoPipe } from "../../../common/pipes/user-info.pipe";
import {PaginationPipe} from "../../../common/pipes/pagination.pipe";
import {Public} from "../../../common/decorators/public.decorator";
import { QueryPubDateDto } from './dto/query-pub-date.dto';

@Controller('movie/pubDate')
export class PubDateController {
  constructor(private readonly pubDateService: PubDateService) {}

  @Post()
  async create(
    @Body() createPubDateDto: CreatePubDateDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createPubDateDto.createBy = createPubDateDto.updateBy = userName;
    await this.pubDateService.create(createPubDateDto);
  }

  @Public()
  @Get('list')
  list(@Query(PaginationPipe) queryPubDateDto: QueryPubDateDto) {
    return this.pubDateService.findPageList(queryPubDateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pubDateService.findOne(+id);
  }

  @Put()
  update(@Body() updatePubDateDto: UpdatePubDateDto) {
    return this.pubDateService.update(updatePubDateDto);
  }

  @Delete(':ids')
  delete(@Param('ids') ids: string) {
    return this.pubDateService.delete(ids);
  }
}
