import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import {
  ReqCreateGenreDto,
  ReqListGenreDto,
  ReqUpdateGenreDto,
} from './dto/req-genre.dto';
import { ApiException } from '../../../common/exceptions/api.exception';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { DataObj } from '../../../common/class/data-obj.class';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('basic/genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(
    @Body() createGenreDto: ReqCreateGenreDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const genre = await this.genreService.findByName(createGenreDto.name);
    if (genre) throw new ApiException('中文名称已存在');
    createGenreDto.createBy = createGenreDto.updateBy = userName;
    return this.genreService.create(createGenreDto);
  }

  @Get('list')
  list(@Query(PaginationPipe) reqListGenreDto: ReqListGenreDto) {
    return this.genreService.findPageAll(reqListGenreDto);
  }

  @Public()
  @Get('all')
  async all(@Query(PaginationPipe) reqListGenreDto: ReqListGenreDto) {
    const data = await this.genreService.findAll(reqListGenreDto);
    return new DataObj(data);
  }

  @Put()
  update(
    @Body() updateGenreDto: ReqUpdateGenreDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateGenreDto.updateBy = userName;
    return this.genreService.update(updateGenreDto);
  }

  @Delete(':ids')
  async delete(@Param('ids') ids: string) {
    await this.genreService.delete(ids);
  }
}
