import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WebUserService } from './web-user.service';
import { Request } from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { LoginWebUserDto, RegWebUserDto } from './dto/req-web-user.dto';
import { LocalWebAuthGuard } from 'src/common/guards/local-web-auth.guard';
import { JwtWebAuthGuard } from '../../../common/guards/jwt-web-auth.guard';
import { DataObj } from '../../../common/class/data-obj.class';

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
  async info(@Req() req) {
    const data = await this.webUserService.info(req.user.userId);
    return new DataObj(data);
  }
}
