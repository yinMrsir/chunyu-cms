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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('友情链接')
@Controller('basic/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @ApiOperation({ summary: '新增' })
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

  @ApiOperation({ summary: '分页获取数据' })
  @Get('list')
  async list(@Query(PaginationPipe) reqListDot: ReqLinkDto) {
    const [rows, total] = await this.linkService.findPageList(reqListDot);
    return {
      rows,
      total,
    };
  }

  @ApiOperation({ summary: '获取全部数据' })
  @Public()
  @Get('all')
  async all() {
    const data = await this.linkService.findAllList();
    return new DataObj(data);
  }

  @ApiOperation({ summary: '修改' })
  @Put()
  update(
    @Body() updateLinkDto: UpdateLinkDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateLinkDto.updateBy = userName;
    return this.linkService.update(updateLinkDto);
  }

  @ApiOperation({ summary: '删除' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
