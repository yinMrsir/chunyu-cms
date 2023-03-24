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
import { CountryService } from './country.service';
import {
  ReqCreateCountryDto,
  ReqListCountryDto,
  ReqUpdateCountryDto,
} from './dto/req-country.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { ApiException } from '../../../common/exceptions/api.exception';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import Configuration from 'src/config/configuration';
import { DataObj } from '../../../common/class/data-obj.class';
import { Public } from '../../../common/decorators/public.decorator';

const defaultImg = Configuration().publicPath + '/default.jpg';

@Controller('basic/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() reqCreateCountryDto: ReqCreateCountryDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    const country = await this.countryService.findByCountryName(
      reqCreateCountryDto.name,
    );
    if (country) throw new ApiException('该用户简称已存在');
    reqCreateCountryDto.createBy = reqCreateCountryDto.updateBy = userName;
    if (!reqCreateCountryDto.flag) {
      reqCreateCountryDto.flag = defaultImg;
    }
    return this.countryService.create(reqCreateCountryDto);
  }

  @Get('list')
  async list(@Query(PaginationPipe) reqListCountryDto: ReqListCountryDto) {
    return this.countryService.findPageList(reqListCountryDto);
  }

  @Public()
  @Get('all')
  async all(@Query(PaginationPipe) reqListCountryDto: ReqListCountryDto) {
    const data = await this.countryService.findAll(reqListCountryDto);
    return new DataObj(data);
  }

  @Get('levels')
  async levels() {
    const data = await this.countryService.levels();
    return new DataObj(data);
  }

  @RepeatSubmit()
  @Put()
  update(
    @Body() reqUpdateCountryDto: ReqUpdateCountryDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateCountryDto.updateBy = userName;
    if (!reqUpdateCountryDto.flag) {
      reqUpdateCountryDto.flag = defaultImg;
    }
    return this.countryService.update(reqUpdateCountryDto);
  }

  @Delete(':ids')
  delete(@Param('ids') ids: string) {
    return this.countryService.delete(ids);
  }
}
