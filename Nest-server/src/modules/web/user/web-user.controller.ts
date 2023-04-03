import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { WebUserService } from './web-user.service';
import { Public } from '../../../common/decorators/public.decorator';
import { LoginWebUserDto, RegWebUserDto } from './dto/req-web-user.dto';
import { LocalWebAuthGuard } from 'src/common/guards/local-web-auth.guard';
import { Request } from 'express';

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
}
