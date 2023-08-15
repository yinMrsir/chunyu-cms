import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { IndexService } from './index.service';
import { DataObj } from '../../../common/class/data-obj.class';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户端数据')
@Controller('web')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @ApiOperation({ summary: '首页影视数据' })
  @Public()
  @Get('index')
  async index() {
    const data = await this.indexService.getIndexData();
    return new DataObj(data);
  }

  @ApiOperation({ summary: '栏目影视数据' })
  @Public()
  @Get('type/:columnValue')
  async type(@Param('columnValue') columnValue: string) {
    const data = await this.indexService.getTypeData(columnValue);
    return new DataObj(data);
  }
}
