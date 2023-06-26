import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { UserCollect } from '../../user-collect/entities/user-collect.entity';

@Entity({ name: 'web_user' })
export class WebUser extends BaseEntity {
  /* 用户Id */
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '用户ID',
  })
  @Type()
  @IsOptional()
  userId: number;

  /* 用户邮箱 */
  @Column({
    comment: '用户邮箱',
    length: 50,
    default: null,
  })
  @IsEmail({}, { message: '邮箱地址不正确' })
  email?: string;

  /* 密码 */
  @Column({
    comment: '密码',
    length: 100,
    default: '',
    select: false,
  })
  @IsString()
  password: string;

  @Column({
    comment: '盐加密',
    length: 100,
    default: '',
    select: false,
  })
  salt: string;

  /* 帐号状态 */
  @Column({
    comment: '帐号状态（0正常 1停用）',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsOptional()
  status: string;

  /* 最后登录IP */
  @Column({
    name: 'login_ip',
    comment: '最后登录IP',
    length: 128,
    default: '',
  })
  @IsOptional()
  @IsString()
  loginIp?: string;

  /* 最后登录时间 */
  @Column({
    name: 'login_date',
    comment: '最后登录时间',
    default: null,
  })
  @IsOptional()
  @IsString()
  loginDate?: Date;

  @Column({
    name: 'member_type',
    comment: '1: 普通用户 2：黄金会员',
    default: 1,
  })
  @IsOptional()
  memberType: number;

  @OneToMany(() => UserCollect, (userCollect) => userCollect.userId)
  userCollects: UserCollect[];
}
