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
  publicPath: `https://cms.yinchunyu.com/server`,

  // 默认图片地址
  defaultImg: `https://cms.yinchunyu.com/server/default.jpg`,

  // 是否演示环境
  isDemoEnvironment: true,

  // 阿里云oss配置
  aliOss: {
    // 填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: process.env.REGION,
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: process.env.ACCESS_KEY_Id,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    // 填写Bucket名称。
    bucket: process.env.BUCKET,
    // 是否支持上传自定义域名
    cname: !!process.env.CNAME,
    // OSS访问域名
    endpoint: process.env.ENDPOINT,
    // 超时 5分钟
    timeout: 1000 * 60 * 5,
  },
});
