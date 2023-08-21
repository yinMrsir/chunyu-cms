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
import { ApiException } from '../../common/exceptions/api.exception';
import { PaginationPipe } from '../../common/pipes/pagination.pipe';
import { QueryColumnDto } from './dto/query-column.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('栏目管理')
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: '新增' })
  @Post()
  async create(
    @Body() createColumnDto: CreateColumnDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const column = await this.columnService.findOne({
      value: createColumnDto.value,
    });
    if (column) throw new ApiException('目录名已存在');
    createColumnDto.createBy = createColumnDto.updateBy = userName;
    return this.columnService.create(createColumnDto);
  }

  @ApiOperation({ summary: '分页查询' })
  @Public()
  @Get('list')
  list(@Query(PaginationPipe) queryColumnDto: QueryColumnDto) {
    return this.columnService.findPageList(queryColumnDto);
  }

  @ApiOperation({ summary: '查询所有' })
  @Public()
  @Get('all')
  async all(@Query(PaginationPipe) queryColumnDto: QueryColumnDto) {
    const data = await this.columnService.findAll(queryColumnDto);
    return new DataObj(data);
  }

  @ApiOperation({ summary: '根据条件查询单个' })
  @Public()
  @Get()
  async findOne(@Query() where: QueryColumnDto) {
    const data = await this.columnService.findOne(where);
    return new DataObj(data);
  }

  @ApiOperation({ summary: '修改' })
  @Put()
  update(
    @Body() updateColumnDto: UpdateColumnDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateColumnDto.updateBy = userName;
    return this.columnService.update(updateColumnDto);
  }

  @ApiOperation({ summary: '删除一个或多个' })
  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.columnService.remove(ids);
  }
}
