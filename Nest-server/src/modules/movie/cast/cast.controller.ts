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
import { CastService } from './cast.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { QueryCastDto } from './dto/query-cast.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';

@Controller('movie/cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() createCastDto: CreateCastDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createCastDto.createBy = createCastDto.updateBy = userName;
    await this.castService.create(createCastDto);
  }

  @Public()
  @Get('list')
  list(@Query(PaginationPipe) queryCastDto: QueryCastDto) {
    return this.castService.findPageList(queryCastDto);
  }

  @RepeatSubmit()
  @Put()
  async update(
    @Body() updateCastDto: UpdateCastDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateCastDto.updateBy = userName;
    await this.castService.update(updateCastDto);
  }

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    await this.castService.remove(ids);
  }
}
