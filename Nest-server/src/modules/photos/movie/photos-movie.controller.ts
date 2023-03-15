import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PhotosMovieService } from './photos-movie.service';
import {
  ReqCreatePhotosMovieDto,
  ReqListPhotosMovieDto,
} from './dto/req-photos-movie.dto';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('photos/movie')
export class PhotosMovieController {
  constructor(private readonly photosMovieService: PhotosMovieService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() reqCreatePhotosMovieDto: ReqCreatePhotosMovieDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqCreatePhotosMovieDto.createBy = reqCreatePhotosMovieDto.updateBy =
      userName;
    await this.photosMovieService.create(reqCreatePhotosMovieDto);
  }

  @Get('list')
  async list(
    @Query(PaginationPipe) reqListPhotosMovieDto: ReqListPhotosMovieDto,
  ) {
    const data = await this.photosMovieService.findPageAll(
      reqListPhotosMovieDto,
    );
    return new DataObj(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body('remark') remark: string) {
    await this.photosMovieService.delete(id, remark);
  }
}
