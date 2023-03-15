import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { IndexService } from './index.service';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('web')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Public()
  @Get('index')
  async index() {
    const data = await this.indexService.getIndexData();
    return new DataObj(data);
  }

  @Public()
  @Get('type/:columnValue')
  async type(@Param('columnValue') columnValue: string) {
    const data = await this.indexService.getTypeData(columnValue);
    return new DataObj(data);
  }
}
