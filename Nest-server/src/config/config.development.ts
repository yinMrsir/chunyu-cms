import { defineConfig } from './defineConfig';

/**
 * 获取服务器端的Ip
 */
function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm 配置
  database: {
    type: 'mysql', //数据库类型
    host: process.env.MYSQL_HOST || '127.0.0.1', //数据库地址
    port: process.env.MYSQL_PORT || 3306, //数据库端口
    username: process.env.MYSQL_USERNAME || 'root', //数据库账号
    password: process.env.MYSQL_PASSWORD || '123456', //数据库密码
    database: process.env.MYSQL_DATABASE || 'chunyu-cms', //数据库名称
    autoLoadModels: true, //模型自动加载，无需在在配置处重复写实体。
    synchronize: true, //如果为true 自动加载的模型将被同步进数据库，生产环境要关闭，否则可能因为字段的删除而造成数据的丢失。
    logging: false, //是否启动日志记录
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
  publicPath: `http://[::1]:4000`,

  // 默认图片地址
  defaultImg: `http://[::1]:4000/default.jpg`,

  // 是否演示环境
  isDemoEnvironment: false,

  // 阿里云oss配置
  aliOss: {
    // 填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: '',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: '',
    accessKeySecret: '',
    // 填写Bucket名称。
    bucket: '',
    // 是否支持上传自定义域名
    cname: true,
    // OSS访问域名
    endpoint: '',
    // 超时 5分钟
    timeout: 1000 * 60 * 5,
  },
});
