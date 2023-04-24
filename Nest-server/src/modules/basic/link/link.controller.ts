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
import { ReqLinkDto } from './dto/req-link.dto';
import { DataObj } from '../../../common/class/data-obj.class';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { ApiException } from '../../../common/exceptions/api.exception';

@Controller('basic/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(
    @Body() createLinkDto: CreateLinkDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const link = this.linkService.findByOne({ text: createLinkDto.text });
    if (link) throw new ApiException('文字内容已存在');
    createLinkDto.createBy = createLinkDto.updateBy = userName;
    return this.linkService.create(createLinkDto);
  }

  @Get('list')
  async list(@Query(PaginationPipe) reqListDot: ReqLinkDto) {
    const [rows, total] = await this.linkService.findPageList(reqListDot);
    return {
      rows,
      total,
    };
  }

  @Public()
  @Get('all')
  async all() {
    const data = await this.linkService.findAllList();
    return new DataObj(data);
  }

  @Put()
  update(
    @Body() updateLinkDto: UpdateLinkDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateLinkDto.updateBy = userName;
    return this.linkService.update(updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
