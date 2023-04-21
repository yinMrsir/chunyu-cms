import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  USER_TOKEN_KEY,
  DICTTYPE_KEY,
  SYSCONFIG_KEY,
  WEB_INDEX,
  WEB_TYPE,
  WEB_USER_KEY,
} from 'src/common/contants/redis.contant';
import { CacheService } from './cache.service';
import { DataObj } from '../../../common/class/data-obj.class';
import { RequiresPermissions } from '../../../common/decorators/requires-permissions.decorator';

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
      remark: '系统用户',
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
    this.caches.push({
      cacheName: WEB_USER_KEY,
      cacheKey: '',
      cacheValue: '',
      remark: '网站用户',
    });
  }

  @Get('getNames')
  @RequiresPermissions('monitor:cache:query')
  async getNames() {
    return new DataObj(this.caches);
  }

  @Get('getKeys/:cacheName')
  @RequiresPermissions('monitor:cache:query')
  async getCacheKeys(@Param('cacheName') cacheName: string) {
    const data: string[] = await this.cacheService.getCacheKeys(
      cacheName + '*',
    );
    return new DataObj(data);
  }

  @Get('getValue/:cacheName/:cacheKey')
  @RequiresPermissions('monitor:cache:query')
  async getCacheValue(@Param('cacheKey') cacheKey: string) {
    const data = await this.cacheService.getCache(cacheKey);
    return new DataObj(data);
  }

  @Delete('clearCacheKey/:cacheKey')
  @RequiresPermissions('monitor:cache:remove')
  async clearCacheKey(@Param('cacheKey') cacheKey: string) {
    await this.cacheService.deleteCache(cacheKey);
  }

  @Delete('clearCacheAll')
  @RequiresPermissions('monitor:cache:remove')
  async clearCacheAll() {
    const keys = await this.cacheService.getCacheKeys('*');
    this.cacheService.deleteCache(keys);
  }
}
