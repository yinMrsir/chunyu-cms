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
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { ReqListDto } from './dto/req-list.dto';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('basic/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get('list')
  async list(@Query(PaginationPipe) reqListDot: ReqListDto) {
    const [rows, count] = await this.linkService.findPageList(reqListDot);
    return {
      rows,
      count,
    };
  }

  @Public()
  @Get('all')
  async all() {
    const data = await this.linkService.findAllList();
    return new DataObj(data);
  }

  @Put()
  update(@Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
