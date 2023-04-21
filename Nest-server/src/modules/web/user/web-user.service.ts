import { Injectable } from '@nestjs/common';
import { QueryWebUserDto, RegWebUserDto } from './dto/req-web-user.dto';
import { SharedService } from '../../../shared/shared.service';
import { WebUser } from './entities/web-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { WEB_USER_KEY } from '../../../common/contants/redis.contant';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import * as moment from 'moment';

@Injectable()
export class WebUserService {
  constructor(
    @InjectRepository(WebUser)
    private readonly webUserRepository: Repository<WebUser>,
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async create(regUserDto: RegWebUserDto) {
    if (regUserDto.password) {
      regUserDto.salt = this.sharedService.generateUUID();
      regUserDto.password = this.sharedService.md5(
        regUserDto.password + regUserDto.salt,
      );
    }
    await this.webUserRepository.save(regUserDto);
  }

  async findByEmail(email) {
    return this.webUserRepository.findOne({
      where: {
        email,
      },
      select: ['email', 'userId', 'salt', 'password'],
    });
  }

  async login(request: Request) {
    const { user } = request as any;
    const payload = { userId: user.userId };
    const jwtSign = this.jwtService.sign(payload);
    await this.redis.set(
      `${WEB_USER_KEY}:${user.userId}`,
      jwtSign,
      'EX',
      60 * 60 * 24,
    );
    // 保存最后登录时间和最后登录IP
    await this.webUserRepository.update(
      {
        userId: user.userId,
      },
      {
        loginIp: this.sharedService.getReqIP(request),
        loginDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
      },
    );
    return {
      token: jwtSign,
    };
  }

  info(userId: number) {
    return this.webUserRepository.findOneBy({ userId });
  }

  findListPage(queryWebUserDto: QueryWebUserDto) {
    return this.webUserRepository.findAndCount({
      take: queryWebUserDto.take,
      skip: queryWebUserDto.skip,
      select: [
        'email',
        'status',
        'createTime',
        'userId',
        'loginDate',
        'loginIp',
      ],
    });
  }
}
