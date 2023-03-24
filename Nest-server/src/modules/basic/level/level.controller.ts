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
import { LevelService } from './level.service';
import {
  ReqCreateLevelDto,
  ReqListLevelDto,
  ReqUpdateLevelDto,
} from './dto/req-level.dto';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { ApiException } from '../../../common/exceptions/api.exception';
import { DataObj } from '../../../common/class/data-obj.class';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';

@Controller('basic/level')
@ApiTags('基础数据-家长引导')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @RepeatSubmit()
  @Post()
  @ApiOperation({ summary: '创建家长引导' })
  async create(
    @Body() createLevelDto: ReqCreateLevelDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const level = await this.levelService.findOne({
      countryId: createLevelDto.countryId,
      level: createLevelDto.level,
    });
    if (level) throw new ApiException('当前家长引导已存在');
    createLevelDto.createBy = createLevelDto.updateBy = userName;
    return this.levelService.create(createLevelDto);
  }

  @Get('all')
  async all() {
    const data = await this.levelService.findAll();
    return new DataObj(data);
  }

  @Get('list')
  list(@Query(PaginationPipe) reqListLevelDto: ReqListLevelDto) {
    return this.levelService.findPageAll(reqListLevelDto);
  }

  @RepeatSubmit()
  @Put()
  update(
    @Body() updateLevelDto: ReqUpdateLevelDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateLevelDto.updateBy = userName;
    return this.levelService.update(updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
