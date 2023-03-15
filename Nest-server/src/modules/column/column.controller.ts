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
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { User, UserEnum } from '../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../common/pipes/user-info.pipe';
import { DataObj } from '../../common/class/data-obj.class';
import { Public } from '../../common/decorators/public.decorator';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(
    @Body() createColumnDto: CreateColumnDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createColumnDto.createBy = createColumnDto.updateBy = userName;
    return this.columnService.create(createColumnDto);
  }

  @Public()
  @Get('list')
  list() {
    return this.columnService.findPageList();
  }

  @Public()
  @Get('all')
  async all() {
    const data = await this.columnService.findAll();
    return new DataObj(data);
  }

  @Get()
  findOne(@Query() where) {
    return this.columnService.findOne(where);
  }

  @Put()
  update(
    @Body() updateColumnDto: UpdateColumnDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateColumnDto.updateBy = userName;
    return this.columnService.update(updateColumnDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.columnService.remove(ids);
  }
}
