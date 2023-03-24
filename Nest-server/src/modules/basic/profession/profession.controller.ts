import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import {
  ReqCreateProfessionDto,
  ReqUpdateProfessionDto,
} from './dto/req-profession.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { ApiException } from '../../../common/exceptions/api.exception';
import { DataObj } from '../../../common/class/data-obj.class';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';

@Controller('basic/profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() reqCreateProfessionDto: ReqCreateProfessionDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const profession = await this.professionService.findOne({
      name: reqCreateProfessionDto.name,
      parentId: reqCreateProfessionDto.parentId,
    });
    if (profession) throw new ApiException('数据已存在，请勿重复添加');
    reqCreateProfessionDto.createBy = reqCreateProfessionDto.updateBy =
      userName;
    return this.professionService.create(reqCreateProfessionDto);
  }

  @Get('all')
  async findAll() {
    const data = await this.professionService.findAll();
    return new DataObj(data);
  }

  @RepeatSubmit()
  @Put()
  update(
    @Body() reqUpdateProfessionDto: ReqUpdateProfessionDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateProfessionDto.updateBy = userName;
    return this.professionService.update(reqUpdateProfessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionService.remove(+id);
  }
}
