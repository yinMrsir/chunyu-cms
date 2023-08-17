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
import { VideoService } from './video-list.service';
import { CreateVideoDto } from './dto/create-video-list.dto';
import { UpdateVideoDto } from './dto/update-video-list.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { QueryVideoDto } from './dto/query-video-list.dto';
import * as fs from 'fs-extra';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createVideoDto.createBy = createVideoDto.updateBy = userName;
    await this.videoService.create(createVideoDto);
  }

  @Get('list')
  list(@Query(PaginationPipe) queryVideoDto: QueryVideoDto) {
    return this.videoService.findPageList(queryVideoDto);
  }

  @Put()
  async update(
    @Body() updateVideoDto: UpdateVideoDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateVideoDto.updateBy = userName;
    await this.videoService.update(updateVideoDto);
  }

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    const data = await this.videoService.findByIds(ids);
    const deleteIds = [];
    data.forEach((value) => {
      // 检测文件是否存在
      if (fs.existsSync(value.path)) {
        fs.unlinkSync(value.path);
        deleteIds.push(value.id);
      }
    });
    return this.videoService.remove(deleteIds.join(','));
  }
}
