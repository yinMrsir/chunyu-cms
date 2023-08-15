import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('首页焦点图')
@Controller('basic/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiOperation({ summary: '新增' })
  @RepeatSubmit()
  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @ApiOperation({ summary: '获取焦点图数据' })
  @Public()
  @Get('list')
  list() {
    return this.bannerService.findPageList();
  }

  @ApiOperation({ summary: '修改' })
  @RepeatSubmit()
  @Put()
  update(@Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(updateBannerDto);
  }

  @ApiOperation({ summary: '删除' })
  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.bannerService.remove(ids);
  }
}
