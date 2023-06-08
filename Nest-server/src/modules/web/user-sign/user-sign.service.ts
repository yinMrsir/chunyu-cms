import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserSign } from './entities/user-sign.entity';
import { UserSignLog } from './entities/user-sign-log.entity';
import * as dayjs from 'dayjs';
import { UserWalletService } from '../user-wallet/user-wallet.service';
@Injectable()
export class UserSignService {
  constructor(
    @InjectRepository(UserSign)
    private readonly userSignRepository: Repository<UserSign>,
    @InjectRepository(UserSignLog)
    private readonly userSignLogRepository: Repository<UserSignLog>,
    private readonly userWalletService: UserWalletService,
  ) {}

  /** 按日期查询用户签到 */
  findUserSign(userId: number, date?: string[]): Promise<UserSignLog> {
    const timeArr: string[] = date || [
      dayjs().format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59'),
    ];
    const start = timeArr[0];
    const end = timeArr[1];
    const where: FindOptionsWhere<UserSignLog> = {
      userId,
    };
    where.signTime = Between(start, end);
    return this.userSignLogRepository.findOneBy(where);
  }

  /** 用户签到 */
  async sign(userId: number): Promise<{ signReward: string }> {
    // 查询签到信息
    const userSignQueryBuilder = this.userSignRepository.findOne({
      where: { userId },
      select: ['id', 'seriesDays', 'continuityDays'],
    });
    // 查询前一天的签到记录
    const timeArr: string[] = [
      dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'),
      dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59'),
    ];
    const userSignLogQueryBuilder = this.findUserSign(userId, timeArr);
    const [userSign, userSignLog] = await Promise.all([
      userSignQueryBuilder,
      userSignLogQueryBuilder,
    ]);
    // 更新签到信息
    if (userSign) {
      await this.userSignRepository.update(userSign.id, {
        seriesDays: userSign.seriesDays + 1,
        continuityDays: userSignLog ? userSign.continuityDays + 1 : 1,
      });
    } else {
      await this.userSignRepository.save({
        userId,
        seriesDays: 1,
        continuityDays: 1,
      });
    }
    // 写入签到记录
    const content = { signReward: '+100金币' };
    await this.userSignLogRepository.save({
      userId,
      ...content,
    });
    // 给用户添加金币
    await this.userWalletService.updateGold({
      userId,
      gold: 100,
      type: '1',
      remark: '签到 +100',
    });
    return content;
  }
}
