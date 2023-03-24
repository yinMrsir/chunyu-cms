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
import { LanguageService } from './language.service';
import {
  ReqCreateLanguageDto,
  ReqUpdateLanguageDto,
  ReqListLanguageDto,
} from './dto/req-language.dto';
import { ApiException } from '../../../common/exceptions/api.exception';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { DataObj } from '../../../common/class/data-obj.class';

@Controller('basic/language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() reqCreateLanguageDto: ReqCreateLanguageDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const language = await this.languageService.findByName(
      reqCreateLanguageDto.name,
    );
    if (language) throw new ApiException('中文简称已存在');
    reqCreateLanguageDto.createBy = reqCreateLanguageDto.updateBy = userName;
    return this.languageService.create(reqCreateLanguageDto);
  }

  @Get('list')
  async list(@Query(PaginationPipe) reqListLanguageDto: ReqListLanguageDto) {
    return this.languageService.findPageList(reqListLanguageDto);
  }

  @Public()
  @Get('all')
  async all(@Query(PaginationPipe) reqListLanguageDto: ReqListLanguageDto) {
    const data = await this.languageService.findAll(reqListLanguageDto);
    return new DataObj(data);
  }

  @RepeatSubmit()
  @Put()
  update(
    @Body() reqUpdateLanguageDto: ReqUpdateLanguageDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateLanguageDto.updateBy = userName;
    return this.languageService.update(reqUpdateLanguageDto);
  }

  @Delete(':ids')
  async delete(@Param('ids') ids: string) {
    await this.languageService.delete(ids);
  }
}
