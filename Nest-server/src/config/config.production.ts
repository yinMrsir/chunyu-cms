import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm 配置
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: process.env.MYSQL_DATABASE || 'chunyu-cms',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
  // redis 配置
  redis: {
    config: {
      url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:6379/0`,
    },
  },

  // 队列reids 配置
  bullRedis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: '6379',
    password: '',
  },

  //文件上传地址  例如： E:/upload/test
  uploadPath: '',

  //静态文件前缀地址
  publicPath: `http://cms.yinchunyu.com/server`,

  // 默认图片地址
  defaultImg: `http://cms.yinchunyu.com/server/default.jpg`,

  // 是否演示环境
  isDemoEnvironment: true,
});
