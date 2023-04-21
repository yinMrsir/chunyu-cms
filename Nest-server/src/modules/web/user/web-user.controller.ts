import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WebUserService } from './web-user.service';
import { Request } from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import {
  LoginWebUserDto,
  QueryWebUserDto,
  RegWebUserDto,
} from './dto/req-web-user.dto';
import { LocalWebAuthGuard } from 'src/common/guards/local-web-auth.guard';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { DataObj } from '../../../common/class/data-obj.class';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';

@Controller('web/user')
export class WebUserController {
  constructor(private readonly webUserService: WebUserService) {}

  @Public()
  @Post('reg')
  reg(@Body() regUserWebDto: RegWebUserDto) {
    return this.webUserService.create(regUserWebDto);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalWebAuthGuard)
  async login(@Body() loginUserDto: LoginWebUserDto, @Req() req: Request) {
    return this.webUserService.login(req);
  }

  @Public()
  @Get('info')
  @UseGuards(JwtWebAuthGuard)
  async info(@User(UserEnum.userId) userId: number) {
    const data = await this.webUserService.info(userId);
    return new DataObj(data);
  }

  @Get('list')
  async list(@Query(PaginationPipe) queryWebUserDto: QueryWebUserDto) {
    const [rows, total] = await this.webUserService.findListPage(
      queryWebUserDto,
    );
    return { rows, total };
  }
}
