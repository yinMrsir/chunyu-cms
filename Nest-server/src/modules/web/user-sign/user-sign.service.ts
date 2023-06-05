import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserSign } from './entities/user-sign.entity';
import { UserSignLog } from './entities/user-sign-log.entity';
import * as dayjs from 'dayjs';
@Injectable()
export class UserSignService {
  constructor(
    @InjectRepository(UserSign)
    private readonly userSignRepository: Repository<UserSign>,
    @InjectRepository(UserSignLog)
    private readonly userSignLogRepository: Repository<UserSignLog>,
  ) {}

  /** 按日期查询用户签到 */
  findUserSign(userId: number, date?: string[]): Promise<UserSignLog> {
    const timeArr: string[] = date || [
      dayjs().format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59'),
    ];
    const start = timeArr[0];
    const end = timeArr[1];
    let queryBuilder =
      this.userSignLogRepository.createQueryBuilder('userSignLog');
    queryBuilder = queryBuilder.where('userId = :userId', { userId });
    queryBuilder = queryBuilder.andWhere('signTime BETWEEN :start AND :end', {
      start,
      end,
    });
    return queryBuilder.getRawOne();
  }
}
