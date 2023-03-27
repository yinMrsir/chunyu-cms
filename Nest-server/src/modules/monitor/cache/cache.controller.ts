import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  USER_TOKEN_KEY,
  DICTTYPE_KEY,
  SYSCONFIG_KEY,
  WEB_INDEX,
  WEB_TYPE,
} from 'src/common/contants/redis.contant';
import { CacheService } from './cache.service';
import { DataObj } from '../../../common/class/data-obj.class';

export type ICache = {
  cacheName: string;
  cacheKey: string;
  cacheValue: string;
  remark: string;
};

@Controller('monitor/cache')
export class CacheController {
  private caches: ICache[] = [];

  constructor(private cacheService: CacheService) {
    this.caches.push({
      cacheName: USER_TOKEN_KEY,
      cacheKey: '',
      cacheValue: '',
      remark: '用户信息',
    });
    this.caches.push({
      cacheName: SYSCONFIG_KEY,
      cacheKey: '',
      cacheValue: '',
      remark: '配置信息',
    });
    this.caches.push({
      cacheName: DICTTYPE_KEY,
      cacheKey: '',
      cacheValue: '',
      remark: '数据字典',
    });
    this.caches.push({
      cacheName: WEB_INDEX,
      cacheKey: '',
      cacheValue: '',
      remark: '首页数据',
    });
    this.caches.push({
      cacheName: WEB_TYPE,
      cacheKey: '',
      cacheValue: '',
      remark: '栏目数据',
    });
  }

  @Get('getNames')
  async getNames() {
    return new DataObj(this.caches);
  }

  @Get('getKeys/:cacheName')
  async getCacheKeys(@Param('cacheName') cacheName: string) {
    const data: string[] = await this.cacheService.getCacheKeys(
      cacheName + '*',
    );
    return new DataObj(data);
  }

  @Get('getValue/:cacheName/:cacheKey')
  async getCacheValue(@Param('cacheKey') cacheKey: string) {
    const data = await this.cacheService.getCache(cacheKey);
    return new DataObj(data);
  }

  @Delete('clearCacheKey/:cacheKey')
  async clearCacheKey(@Param('cacheKey') cacheKey: string) {
    await this.cacheService.deleteCache(cacheKey);
  }

  @Delete('clearCacheAll')
  async clearCacheAll() {
    const keys = await this.cacheService.getCacheKeys('*');
    this.cacheService.deleteCache(keys);
  }
}
