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

@Controller('basic/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @RepeatSubmit()
  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Public()
  @Get('list')
  list() {
    return this.bannerService.findPageList();
  }

  @RepeatSubmit()
  @Put()
  update(@Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(updateBannerDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.bannerService.remove(ids);
  }
}
